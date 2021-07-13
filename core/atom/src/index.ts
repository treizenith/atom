import $quark from '@treizenith/quark';

import $unique from './unique';
import $thrower from './thrower';
import * as $async from './async';
import * as $reactor from "./reactor";

import type {
	OPT, AtomPlugin,
	AtomPluginArg,
	ReturnTypeOf
} from "./general";
class Atom {
	static _ = $quark;
	static thrower = $thrower;
	static async = $async;
	static unique = $unique;
	static tag: string = '[ AtomJS ] ';
	static sym = Symbol('ex');
	static err = Symbol('err');
	static reactor = $reactor;

	#private: {
		privateKEY: string;
		trials: any[];
	} = {
			privateKEY: '',
			trials: [],
		};

	defaults!: OPT;
	$: Record<string | number | symbol, any> = {};

	constructor(defaults?: OPT, priv?: string) {
		if (!Atom._.is.obj(defaults) && !Atom._.is.und(defaults)) {
			Atom.thrower.make(
				'defaults must be objects',
				{
					target: Atom.tag,
				},
				true,
			);
		}

		if (!Atom._.is.und(defaults)) {
			this.defaults = defaults;
		} else {
			this.defaults = {};
		}

		if (priv) {
			if (!Atom._.is.str(priv)) {
				this.#private.privateKEY = Atom.unique();
			} else {
				this.#private.privateKEY = priv;
			}
		}
	}

	plugins: AtomPlugin<this>[] = [];
	plug<T extends AtomPluginArg<this>>(plugin: T): this & ReturnTypeOf<T> {
		if (plugin) {
			this.plugins = this.plugins.concat(plugin);
		}

		(Array.isArray(plugin) ? plugin : [plugin]).forEach((pl) => {
			Object.assign(this, Atom._.u.merge(this, pl(this, Atom, this.defaults)));
		});

		return this as this & ReturnTypeOf<T>;
	}
}

export default Atom;
export * from "./general";
// types