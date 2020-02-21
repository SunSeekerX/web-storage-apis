// import bable from 'rollup-plugin-babel'
import filesize from 'rollup-plugin-filesize'

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/bundle.cjs.js',
    format: 'esm', // 给浏览器使用，需要通过webpack打包
    name: 'storage'
  },
  // 使用插件
  plugins: [
    filesize()
    // bable({
    //   exclude: 'node_modules/**' // 排除node_modules,只编译源代码
    // })
  ]
}
