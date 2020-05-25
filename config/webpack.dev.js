const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const webpack = require('webpack');

const devConfig = {
  /**
   * mode: 'development' | 'production'
   *
   * @production：默认值。打包后代码会压缩
   * @development: 打包后代码不会被压缩
   */
  mode: 'development',
  /**
   * devtool: (cheap|inline|module|eval|hidden)-source-map
   *
   * @hidden: 和 source-map 一样，但不会在 bundle 末尾追加注释.
   * @eval: 每个 module 会封装到 eval 里包裹起来执行，并且会在末尾追加注释 //@ sourceURL.
   * @inline: inline-source-map。打包后不会生成map文件，而是以base64的形式注进dist.js文件中。
   * @module: source-map只对业务代码进行映射，对于三方包等忽略。
   * @cheap: 生成一个没有列信息（column-mappings）的 SourceMaps 文件，不包含 loader 的 sourcemap（譬如 babel 的 sourcemap）
   *
   * 文档：https://www.webpackjs.com/configuration/devtool/
   *
   * 最佳实践
   * dev: cheap-module-eval-source-map
   * pro: cheap-module-source-map
   */
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: './dist',
    open: true,
    port: 8080,
    hot: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        pathRewrite: {'^/api' : ''},
        changeOrigin: true
      }
    }
  },
  plugins: [
		new webpack.HotModuleReplacementPlugin()
	],
	optimization: {
    usedExports: true,
    splitChunks: {
      chunks: "all", // 必须三选一： "initial" | "all"(推荐) | "async" (默认)
      minSize: 30000, // 表示抽取出来的文件在压缩前的最小大小，默认为 30000；
      maxSize: 0, // 表示抽取出来的文件在压缩前的最大大小，默认为 0，表示不限制最大大小；
      minChunks: 1, // 表示被引用次数，默认为1；
      maxAsyncRequests: 5, // 最大的按需(异步)加载次数，默认为 5；
      maxInitialRequests: 3, // 最大的初始化加载次数，默认为 3；
      automaticNameDelimiter: '~', // 抽取出来的文件的自动生成名字的分割符，默认为 ~；
      name: true, // 抽取出来文件的名字，默认为 true，表示自动生成文件名；
      cacheGroups:{
        /**
         * @缓存组
         * 上面的那么多参数，其实都可以不用管，cacheGroups 才是我们配置的关键。
         * 它可以继承/覆盖上面 splitChunks 中所有的参数值，除此之外还额外提供了三个配置，
         * 分别为：test, priority 和 reuseExistingChunk。
         *
         * @property test
         * 表示要过滤 modules，默认为所有的 modules，可匹配模块路径或 chunk 名字，
         * 当匹配的是 chunk 名字的时候，其里面的所有 modules 都会选中；
         *
         * @property priority
         * 表示抽取权重，数字越大表示优先级越高。因为一个 module 可能会满足多个 cacheGroups 的条件，
         * 那么抽取到哪个就由权重最高的说了算；
         *
         * @property reuseExistingChunk
         * 表示是否使用已有的 chunk，如果为 true 则表示如果当前的 chunk 包含的模块已经被抽取出去了，
         * 那么将不会重新生成新的。
         * 
         */
        priority: 0, // 缓存组优先级
        vendor: { // key 为entry中定义的 入口名称
          chunks: "initial", // 必须三选一： "initial" | "all" | "async"(默认)
          test: /react|lodash/, // 正则规则验证，如果符合就提取 chunk
          name: "vendor", // 要缓存的 分隔出来的 chunk 名称
          minSize: 30000,
          minChunks: 1,
          enforce: true,
          maxAsyncRequests: 5, // 最大异步请求数， 默认1
          maxInitialRequests : 3, // 最大初始化请求书，默认1
          reuseExistingChunk: true // 可设置是否重用该chunk
        }
      },
      default: { // 默认
        minChunks: 2,
        priority: -20,
        reuseExistingChunk: true
      }
    }
	}
  // entry: './src/index.js',

  // output: {
  //   filename: 'dist.js',
  //   // publicPath: 'http://cdn.com',
  //   path: path.resolve(__dirname, 'dist'),
  // },
  // plugins: [
  //   new HtmlWebpackPlugin({
  //     template: './index.html', // 以template中的html为模板，打包后生成index.html
  //   }),
  //   new CleanWebpackPlugin(), // 清除上次的打包文件
  // ],
}

module.exports = merge(commonConfig, devConfig);
