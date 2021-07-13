import type ServerIO from "socket.io";
import type { Server as $Server, ServerOptions as $ServerOptions, Socket as $Socket } from "socket.io";
import type Pd from "./palladium";
import type Atom from "@treizenith/atom";
import type { Context } from "koa";
import type { Big } from "@treizenith/atom";
export interface Pre {
    host?: string;
    local: boolean;
}
export interface Config {
    prod?: boolean;
    noTimer?: boolean;
    opt?: OPT;
    handler?: () => void;
    port?: number;
    host?: string;
    pre?: Pre;
}
export declare type method = (ctx: Context, prev: any[], i?: number) => unknown | void;
export interface ServiceRes {
    name: string;
    methods: Record<any, method | method[]>;
    count?: Big;
    hooks?: {
        stop?: Function;
        start?: Function;
        afterStart?: Function;
        afterStop?: Function;
        before?: Function[];
        after?: Function[];
    };
}
export interface ServiceMethods {
    dispatch: (event: string, data: unknown, flow?: any[]) => void;
    call: (ctx?: Context, opt?: any, flow?: any[]) => Promise<Context>;
}
export declare type Service = (this: Pd, atom: typeof Atom, instance: Atom, service: ServiceMethods) => ServiceRes;
export declare type OPT = $ServerOptions;
export declare type Socket = $Socket;
export declare type IO = typeof ServerIO;
export declare type Server = $Server;
export declare type Res = [null | Error, any];
//# sourceMappingURL=general.d.ts.map