/**
 * @name:rollup.config.js
 * @author: SunSeekerX
 * @Date: 2020-04-22 20:30:15
 * @LastEditors: SunSeekerX
 * @LastEditTime: 2020-04-23 18:08:37
 */

import filesize from 'rollup-plugin-filesize'
import { terser } from 'rollup-plugin-terser'

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/bundle.esm.js',
      format: 'esm',
      name: 'storage',
    },
    {
      file: 'test/src/utils/bundle.esm.js',
      format: 'esm',
      name: 'storage',
    },
  ],
  // 使用插件
  plugins: [filesize(), terser()],
  watch: {
    include: 'src/index.js',
    exclude: 'node_modules/**',
  },
}
