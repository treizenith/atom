import type ServerIO from "socket.io";
import type ClientIO from "socket.io-client";
import type { ReturnTypeOf } from "../../../core/quark/types";
import type { Server as $Server, ServerOptions, Socket as $SocketBack } from "socket.io";
import type { SocketOptions, Socket as $SocketFront } from "socket.io-client";
import type Li from "./li";
import type Atom from "@treizenith/atom";

export interface Config {
  prod?: boolean
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
export type Service = (this: Li, atom: typeof Atom, instance: Atom, service: Service) => ServiceRes;

export type OPTFront = SocketOptions;
export type OPTBack = ServerOptions;
export type OPT = OPTFront & OPTBack;

export type SocketFront = $SocketFront;
export type SocketBack = $SocketBack;
export type IOFront = typeof ClientIO;
export type IOBack = typeof ServerIO;
export type Server = $Server;
export type Client = ReturnTypeOf<IOFront>;

export type Res = [null | Error, any]