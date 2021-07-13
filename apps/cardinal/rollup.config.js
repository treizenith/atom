// @ts-check
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript2 from 'rollup-plugin-typescript2';
import json from '@rollup/plugin-json';
import run from '@rollup/plugin-run';

import pkg from './package.json';

/**
 * Comment with library information to be appended in the generated bundles.
 */
const banner = `/*!
 * ${pkg.name} v${pkg.version}
 * (c) ${pkg.author}
 * Released under the ${pkg.license} License.
 */
`;

/**
 * Creates an output options object for Rollup.js.
 * @param {import('rollup').OutputOptions} options
 * @returns {import('rollup').OutputOptions}
 */
function createOutputOptions(options) {
	return {
		banner,
		name: 'cardinal',
		exports: 'named',
		sourcemap: true,
		...options,
	};
}

/**
 * @type {import('rollup').RollupOptions}
 */
const options = {
	input: './src/index.ts',
	output: [
		createOutputOptions({
			file: './dist/index.js',
			format: 'commonjs',
		}),
	],
	plugins: [
		json(),
		nodeResolve({
			preferBuiltins: true,
			modulesOnly: true
		}),
		commonjs(),
		typescript2({
			clean: true,
			useTsconfigDeclarationDir: true,
			tsconfig: './tsconfig.json',
		}),
		run(),
	],
};

export default options;
