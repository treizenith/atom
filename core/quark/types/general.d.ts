export declare type UnionToIntersection<Union> = (Union extends any ? (argument: Union) => void : never) extends (argument: infer Intersection) => void ? Intersection : never;
export declare type AnyFunction = (...args: any[]) => any;
export declare type OPT = {
    priv?: string;
    [key: string]: any;
    [key: number]: any;
};
export declare type ReturnTypeOf<T extends AnyFunction | AnyFunction[]> = T extends AnyFunction ? ReturnType<T> : T extends AnyFunction[] ? UnionToIntersection<ReturnType<T[number]>> : never;
export interface Diff {
    $type?: any;
    $data?: any;
    [key: string]: Diff;
    [key: number]: Diff;
}
export type { BigSource, Comparison, RoundingMode, BigConstructor, Big } from "big.js";
//# sourceMappingURL=general.d.ts.map