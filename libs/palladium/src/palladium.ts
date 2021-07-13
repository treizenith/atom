import type Atom from '@treizenith/atom';
import type { Server as HTTP } from "http";
import type { Config, OPT, Server, Service, ServiceRes } from './general';

// import ky from 'ky';
import io from "socket.io";
import Koa, { Context } from "koa";
import http from "http";
import cors from "@koa/cors";
import body from "koa-bodyparser";
import createContext from 'koa-create-context';
import pre from "./pre";

export default class Pd {
  props: {
    url: string
  } = {
      url: "",
    }

  serviceList = this.atom.reactor.space<Record<string, ReturnType<Service>>>({});

  primary: Server;

  // will escape from types here because there is hundreds of server libraries that use same api
  app: Koa;
  http: HTTP;

  constructor(
    public atom: typeof Atom,
    public instance: Atom,
    public $config: Config = {},
    public selfOpt: unknown,
  ) {
    this.app = new Koa();
    this.app.use(cors({
      allowHeaders: "*",
      maxAge: 8,
    }));
    this.app.use(body());
    this.http = http.createServer(this.app.callback());
    this.primary = new io.Server(this.http, this.atom._.u.merge({
      cors: {
        origin: '*',
      }
    }, $config.opt || {}) as unknown as OPT);
  }

  async init() {
    let self = this;
    this.serviceList.subscribe(this.atom._.u.cb((a, b) => {
      return this.atom._.u.diff.same(a, b);
    }, (diff, servRoot) => {
      for (let [serv, servRes] of Object.entries(diff)) {
        if (servRes.$type == "created") {
          let specServ = servRoot[serv];

          this.serviceStart(specServ).then((res) => {
            if (specServ.hooks && this.atom._.is.func(specServ.hooks.afterStart)) {
              specServ.hooks.afterStart(self, res);
            }
          }).catch((err) => {
            console.log("failed to start service", err);
          });
        }
        if (servRes.$type == "deleted") {
          let specServ = servRoot[serv];

          this.serviceStop(specServ).then((res) => {
            if (specServ.hooks && this.atom._.is.func(specServ.hooks.afterStop)) {
              specServ.hooks.afterStop(self, res);
            }
          }).catch((err) => {
            console.log("failed to start service", err);
          });

        }
      }
    }));

    if (this.app) {
      if (!this.$config.prod) {
        this.app.use(async (ctx: any, next: any) => {
          await next();
          const rt = ctx.response.get('X-Response-Time');
          console.log(`${ctx.method} ${ctx.url} - ${rt}`);
        });
      }

      if (!this.$config.noTimer) {
        this.app.use(async (ctx: any, next: any) => {
          const start = Date.now();
          await next();
          const ms = Date.now() - start;
          ctx.set('X-Response-Time', `${ms}ms`);
        });
      }

      this.app.use(async (ctx: any) => {
        return await self.hire(ctx);
      })
    } else {
      throw "APP NEEDED";
    }
  }

  async registerService(service: Service, opt?: any) {
    let s = service.apply(this, [this.atom, this.instance, {
      call: this.call.bind(this),
      dispatch: this.dispatch.bind(this),
    }]);
    s.count = this.atom._.big((s.count || 0) as number);
    if (s.hooks && this.atom._.is.func(s.hooks.start)) {
      await s.hooks.start(this, opt);
    }

    this.serviceList.set(s.name, s);
  }

  async deleteService(serviceName: string, opt?: any) {
    let s = (this.serviceList.get(serviceName) as ServiceRes);

    if (s) {
      if (s.hooks && this.atom._.is.func(s.hooks.stop)) {
        await s.hooks.stop(this, opt);
      }
      this.serviceList.del(serviceName);
    } else {
      console.log("err on shut");
    }
  }

  async serviceStart(sr: ServiceRes) {
    console.log("start", sr);
  }

  async serviceStop(sr: ServiceRes) {
    console.log("stop", sr);
  }

  runServer() {
    let f = () => {
      console.log("started on port: " + (this.$config.port || 3000))
    }
    this.http.listen(this.$config.port || 3000, this.$config.handler || f);
  }

  async hire(ctx: Context, flow: any[] = []) {
    if (ctx.url.startsWith("/rpc/")) {
      let sourcePath = ctx.url.split("/");
      sourcePath.shift();
      sourcePath.shift();

      if (sourcePath.length != 2) {
        ctx.body = 400;
      } else {
        let query = sourcePath[0] + ".methods." + sourcePath[1];
        if (this.serviceList.has(query)) {
          let res = await new Promise((resolve) => {
            let source = this.serviceList.get(query);

            if(this.atom._.is.arr(source)) {
              let loop = async(fs: any[], prevRes: unknown[]):Promise<any> => {
                let f = fs.shift();
                try {
                  prevRes.unshift(await f(ctx, prevRes));
                }catch(err) {
                  if(err) {
                    return err;
                  }
                }

                if(fs.length > 0) {
                  return await loop(fs, prevRes);
                }else {
                  return prevRes[0];
                }
              }

              loop(source, flow).then(data => {
                resolve(data);
              });
            }else if(this.atom._.is.func(source)) {
              Promise.resolve(source(ctx, [])).then(data => {
                resolve(data);
              });
            }else {
              resolve(source);
            }
          });

          if(this.atom._.is.und(res)) {
            ctx.body = 400;
          }else {
            ctx.body = res;
          }
        } else {
          ctx.body = 404;
        }
      }
    } else {
      ctx.body = 400;
    }

    return ctx;
  }

  async call(ctx?: Context, opt?: any, flow?: any[]): Promise<Context> {
    if(ctx) {
      return await this.hire(ctx, flow);
    }else {
      return await this.hire(createContext(opt), flow);
    }
  }

  dispatch() {
  }

  pre = pre(this);
}