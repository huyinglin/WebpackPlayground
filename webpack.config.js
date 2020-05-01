const path = require('path');

module.exports = {
  /**
   * mode: 'development' | 'production'
   * production：默认值。打包后代码会压缩
   * development: 打包后代码不会被压缩
   */
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'bundle'),
  }
}