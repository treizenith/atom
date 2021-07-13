import $quark from '@treizenith/quark';
import $unique from './unique';
import * as $async from './async';
import * as $reactor from "./reactor";
import type { OPT, AtomPlugin, AtomPluginArg, ReturnTypeOf } from "./general";
declare class Atom {
    #private;
    static _: typeof $quark;
    static thrower: {
        make(message?: string | undefined, options?: import("./general").ThrowerOpt, strict?: boolean | undefined): never;
        isErr(a: any): boolean;
    };
    static async: typeof $async;
    static unique: typeof $unique;
    static tag: string;
    static sym: symbol;
    static err: symbol;
    static reactor: typeof $reactor;
    defaults: OPT;
    $: Record<string | number | symbol, any>;
    constructor(defaults?: OPT, priv?: string);
    plugins: AtomPlugin<this>[];
    plug<T extends AtomPluginArg<this>>(plugin: T): this & ReturnTypeOf<T>;
}
export default Atom;
export * from "./general";
//# sourceMappingURL=index.d.ts.map