// rollup.loadtest.js
import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'src/loadtest.js',
  output: {
    file: 'dst/bundle/loadtest.cjs',
    format: 'cjs'
  },
  plugins: [
    commonjs(),
    resolve(),
    typescript(),
  ],
  onwarn: function (message) {
    if (/Circular dependency/.test(message)) return;
    if (/Use of eval/.test(message)) return;
    console.error(message);
  },
};
