import type Atom from '@treizenith/atom';
import type { Server as HTTP } from "http";
import type { ky } from 'ky/distribution/types/ky';
import type { Config, OPT, Server, IOBack, IOFront, Client, OPTBack, Service, ServiceRes } from './general';

export default class Li {
  props: {
    url: string
  } = {
      url: "",
    }

  serviceList = this.atom.reactor.space<Record<string, ReturnType<Service>>>({});

  primary?: Server;

  // will escape from types here because there is hundreds of server libraries that use same api
  app?: any;

  constructor(
    public ky: ky,
    public io: IOFront | IOBack,
    public atom: typeof Atom,
    public instance: Atom,
    public $config?: Config,
    public isClient: boolean = true
  ) { }

  async login() {
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
      if (!this.$config?.prod) {
        this.app.use(async (ctx: any, next: any) => {
          await next();
          const rt = ctx.response.get('X-Response-Time');
          console.log(`${ctx.method} ${ctx.url} - ${rt}`);
        });

        // x-response-time

        this.app.use(async (ctx: any, next: any) => {
          const start = Date.now();
          await next();
          const ms = Date.now() - start;
          ctx.set('X-Response-Time', `${ms}ms`);
        });
      }

      this.app.use(async (ctx: any) => {
        if (ctx.url.startsWith("/rpc/")) {
          let s = ctx.url.split("/");
          s.shift();
          s.shift();

          if (s.length != 2) {
            ctx.body = 400;
          } else {
            let q = s[0] + ".methods." + s[1];
            if (this.serviceList.has(q)) {
              ctx.body = await ((this.serviceList.get(q)) as any)(q);
            } else {
              ctx.body = 404;
            }
          }
        } else {
          ctx.body = 400;
        }
      })
    } else {
      throw "APP NEEDED";
    }
  }

  runServer(server: HTTP, options?: OPTBack): Server {
    this.primary = new (this.io as IOBack).Server(server, this.atom._.u.merge({
      cors: {
        origin: '*',
      }
    }, options || {}) as unknown as OPTBack);

    return this.primary;
  }

  client(url: string, options?: OPT): Client {
    return (this.io as IOFront)(url, options);
  }

  registerApp(app: any) {
    this.app = app;
  }

  async registerService(service: Service, opt?: any) {
    let s = service.apply(this, [this.atom, this.instance, service]);

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
}