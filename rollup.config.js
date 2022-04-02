import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

export default {
  input: 'index.js',
  output: {
    name: 'biblicalLunisolarCalendar',
    file: 'bundle.js',
    format: 'iife'
  },
  plugins: [nodeResolve(), commonjs({
    include: [ './index.js', 'node_modules/**' ],
  })],
}
