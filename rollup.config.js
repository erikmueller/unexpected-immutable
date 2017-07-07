import babel from 'rollup-plugin-babel'

export default {
  entry: 'lib/unexpected-immutable.js',
  format: 'cjs',
  plugins: [
    babel({
      exclude: 'node_modules/**'
    })
  ],
  dest: 'build/unexpected-immutable.js',
  external: ['immutable']
}
