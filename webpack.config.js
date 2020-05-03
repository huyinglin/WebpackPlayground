const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  /**
   * mode: 'development' | 'production'
   * production：默认值。打包后代码会压缩
   * development: 打包后代码不会被压缩
   */
  mode: 'development',
  entry: './src/index.js',
  module: {
    rules: [{
      test: /\.(jpg|png|gif)$/,
      use: {
        loader: 'url-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'images/',
          limit: 2048, // 2048 === 2kb，如果文件超过这个大小，就会打包成文件。不然就打包成inline JS的base64的 Data URL
        }
      }
    }, {
      test: /\.(eot|ttf|svg|woff)$/,
      use: {
        loader: 'file-loader',
        options: {
          name: '[name]-[hash].[ext]',
          outputPath: 'font/',
        }
      }
    }, {
      test: /\.scss$/,
      use: [
        {
          loader: 'style-loader'
        }, {
          loader: 'css-loader',
          options: {
            importLoaders: 2, // 0 => 无 loader(默认); 1 => postcss-loader; 2 => postcss-loader, sass-loader
            // modules: true, // 启用 CSS modules
          }
        }, {
          loader: 'postcss-loader',
          options: {
            ident: 'postcss',
            plugins: [
              require('autoprefixer'),
            ]
          }
        },
        {
          loader: 'sass-loader'
        }
      ]
    }]
  },
  output: {
    filename: 'dist.js',
    publicPath: 'http://cdn.com',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html', // 以template中的html为模板，打包后生成index.html
    }),
    new CleanWebpackPlugin(), // 清除上次的打包文件
  ],
}