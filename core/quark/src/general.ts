
export type UnionToIntersection<Union> = (
  Union extends any ? (argument: Union) => void : never
) extends (argument: infer Intersection) => void
  ? Intersection
  : never;

export type AnyFunction = (...args: any[]) => any;

export type OPT = { priv?: string;[key: string]: any;[key: number]: any };

export type ReturnTypeOf<
  T extends AnyFunction | AnyFunction[]
  > = T extends AnyFunction
  ? ReturnType<T>
  : T extends AnyFunction[]
  ? UnionToIntersection<ReturnType<T[number]>>
  : never;

export interface Diff {
  $type?: any,
  $data?: any,
  [key: string]: Diff,
  [key: number]: Diff,
}

export type {
  BigSource,
  Comparison,
  RoundingMode,
  BigConstructor,
  Big
} from "big.js";