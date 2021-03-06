// rollup bundle commands
// rollup -c => builds default scrolldir (default)
// rollup -c --environment entry:.auto => builds self envoking scrolldir

import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

const name = process.env.entry ? '.auto' : ''

export default {
  input: `./src/scrolldir${name}.js`,
  plugins: [
    resolve({
      jsnext: true,
      main: true,
      browser: true,
    }),
    commonjs(),
    babel({
      babelrc: false,
      presets: [['@babel/preset-env', { modules: false}]],
      exclude: 'node_modules/**',
    }),
  ],
  output: {
    file: `./dist/scrolldir${name}.js`,
    format: 'umd',
    name: `ScrollDir${name}`,
    sourceMap: false, // removes the souremap at the bottom of the file
  }
}
