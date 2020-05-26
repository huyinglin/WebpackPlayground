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
    contentBase: './dist', // 指定目录
    open: true, // 启动时是否打开浏览器
    // open: 'Chrome', // 指定浏览器
    port: 8080, // 服务端口
    hot: true, // 热模块替换
    proxy: { // 原理是使用 http-proxy-middleware
      '/api': {
        target: 'http://localhost:3000',
        pathRewrite: {'^/api': ''}, // 可以将url中的`/api`替换成空字符串
        changeOrigin: true, // 解决跨域问题。原理：本地会虚拟一个服务器接收你的请求并代你发送该请求
        secure: false, // 可代理到https的target
      }
    },
    // 将多个路径代理到同一个target下，可以用下面的写法
    // proxy: [{
    //   context: ['/auth', '/api'],
    //   target: 'http://localhost:3000',
    // }],

  },
  // historyApiFallback: true, // 404时会默认返回首页
  plugins: [
		new webpack.HotModuleReplacementPlugin()
	],
	optimization: {
		// usedExports: true
	},
  // entry: './src/index.js',

  // output: {
  //   filename: 'dist.js',
  //   // publicPath: 'http://cdn.com',
  //   path: path.resolve(__dirname, 'dist'),
  // },
  plugins: [
    // new HtmlWebpackPlugin({
    //   template: './index.html', // 以template中的html为模板，打包后生成index.html
    // }),
    // new CleanWebpackPlugin(), // 清除上次的打包文件
    new webpack.HotModuleReplacementPlugin()
  ],
}

module.exports = merge(commonConfig, devConfig);
