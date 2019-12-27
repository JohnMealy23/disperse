import typescript from 'rollup-plugin-typescript2';
import sourceMaps from 'rollup-plugin-sourcemaps';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import json from '@rollup/plugin-json';
import replace from 'rollup-plugin-replace';
import { terser } from "rollup-plugin-terser";
import builtins from 'rollup-plugin-node-builtins';
import pkg from './package.json'
import visualizer from 'rollup-plugin-visualizer';
import { eslint } from "rollup-plugin-eslint";

export default [
  {
    input: './src/index.ts',
    output: [{
      sourcemap: true,
      file: pkg.main,
      name: pkg.name,
      format: 'cjs',
    }],
    plugins: [
      builtins(),
      resolve({
        browser: true
      }),
      replace({
        'process.env.NODE_ENV': "'production'",
        'process.env.VERSION': `'${pkg.version}'`
      }),
      json(),
      eslint({
        throwOnError: true
      }),
      typescript({
        useTsconfigDeclarationDir: true,
        rollupCommonJSResolveHack: true,
        clean: true,
        tsconfig: 'tsconfig.json'
      }),
      commonjs({
        include: 'node_modules/**',
        namedExports: {
            // './node_modules/socket.io-client/lib/index.js': ['io'],
        }
      }),
      terser(),
      sourceMaps(),
      // visualizer({
      //   // sourcemap: true,
      //   open: true,
      //   filename: 'dist/stats.html',
      //   template: 'treemap',
      // })
    ]
  }
];
