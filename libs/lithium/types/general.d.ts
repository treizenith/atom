import type ServerIO from "socket.io";
import type ClientIO from "socket.io-client";
import type { ReturnTypeOf } from "../../../core/quark/types";
import type { Server as $Server, ServerOptions, Socket as $SocketBack } from "socket.io";
import type { SocketOptions, Socket as $SocketFront } from "socket.io-client";
import type Li from "./li";
import type Atom from "@treizenith/atom";
export interface Config {
    prod?: boolean;
}
export interface ServiceRes {
    name: string;
    methods: Record<any, Function>;
    hooks?: {
        stop?: Function;
        start?: Function;
        afterStart?: Function;
        afterStop?: Function;
    };
}
export declare type Service = (this: Li, atom: typeof Atom, instance: Atom, service: Service) => ServiceRes;
export declare type OPTFront = SocketOptions;
export declare type OPTBack = ServerOptions;
export declare type OPT = OPTFront & OPTBack;
export declare type SocketFront = $SocketFront;
export declare type SocketBack = $SocketBack;
export declare type IOFront = typeof ClientIO;
export declare type IOBack = typeof ServerIO;
export declare type Server = $Server;
export declare type Client = ReturnTypeOf<IOFront>;
export declare type Res = [null | Error, any];
//# sourceMappingURL=general.d.ts.map