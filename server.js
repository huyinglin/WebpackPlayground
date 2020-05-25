const express = require('express');
const webpack = require('webpack');

// 监听文件变化
const webpackDevMiddleWare = require('webpack-dev-middleware');

// 导入配置文件
const config = require('./config/webpack.dev');

// 返回webpack的编译器
// complier：通过webpack和其他配置文件，可以随时对文件进行编辑
const complier = webpack(config);

// 创建服务器的实例
const app = express();

// 中间件可以接收两个参数，编译器和其他的配置参数
app.use(webpackDevMiddleWare(complier, {}));

app.listen(4000, () => {
  console.log('server is running');
});
