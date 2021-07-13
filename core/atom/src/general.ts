import type Atom from '.';
export interface ThrowerOpt {
	code?: number | string;
	target?: string;
	status?: string;
	data?: any;
	err?: boolean | null;
}


export type ApiExtension = { [key: string]: any;[key: number]: any };
export type AtomPlugin<T> = (
	instance: T,
	atom: typeof Atom,
	options: any,
) => ApiExtension | undefined;

export type AtomPluginArg<T> = AtomPlugin<T> | AtomPlugin<T>[];

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


export interface Observable<T> {
	(newValue: T): void; // write
	(): T; // read

	priv?: string;
	subscribe: AddSubscriber<T>;
	unsubscribe: RemoveSubscriber;
	subscribers: Subscriber<T>[]
}

export interface ObservableMega<T> {
	(newValue: T): void; // write
	(): T; // read

	priv?: string;
	subscribe: AddSubscriber<T>;
	unsubscribe: RemoveSubscriber;
	set: (path: string | any[], value: unknown) => void;
	get: (path: string | any[]) => unknown;
	del: (path: string | any[]) => void;
	has: (path: string | any[]) => boolean;
	subscribers: Subscriber<T>[]
}

export interface Subscriber<T> {
	(latest: T, last?: T): any | void;
}

export interface AddSubscriber<T> {
	(subscriber: Subscriber<T>, runImmediate?: boolean): unSubscribe;
}

export interface RemoveSubscriber {
	(subscriber: Subscriber<any>): void;
}

export interface unSubscribe {
	(): void;
}

export interface Computation<T> {
	(): T;
}

export interface Writer {
	(observable: Observable<any>): void;
}

export * from "@treizenith/quark";