/// <reference types="koa-bodyparser" />
/// <reference types="node" />
import type Atom from '@treizenith/atom';
import type { Server as HTTP } from "http";
import type { Config, Server, Service, ServiceRes } from './general';
import Koa, { Context } from "koa";
export default class Pd {
    atom: typeof Atom;
    instance: Atom;
    $config: Config;
    selfOpt: unknown;
    props: {
        url: string;
    };
    serviceList: import("@treizenith/atom").ObservableMega<Record<string, ServiceRes>>;
    primary: Server;
    app: Koa;
    http: HTTP;
    constructor(atom: typeof Atom, instance: Atom, $config: Config, selfOpt: unknown);
    init(): Promise<void>;
    registerService(service: Service, opt?: any): Promise<void>;
    deleteService(serviceName: string, opt?: any): Promise<void>;
    serviceStart(sr: ServiceRes): Promise<void>;
    serviceStop(sr: ServiceRes): Promise<void>;
    runServer(): void;
    hire(ctx: Context, flow?: any[]): Promise<Koa.Context>;
    call(ctx?: Context, opt?: any, flow?: any[]): Promise<Context>;
    dispatch(): void;
    pre: Record<string, import("./general").method>;
}
//# sourceMappingURL=palladium.d.ts.map