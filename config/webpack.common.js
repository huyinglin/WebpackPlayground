const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

module.exports = {
	entry: {
		main: './src/index.js'
	},
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
          name: '[name].[ext]',
          outputPath: 'font/',
        }
      }
    }, {
      test: /\.js$/,
      exclude: /node_modules/, // 忽略node_modules
      loader: 'babel-loader',
      // use: {
      // }
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
  stats: 'errors-only', // 打包日志如何显示
	plugins: [
		new HtmlWebpackPlugin({
      template: './index.html', // 以template中的html为模板，打包后生成index.html
    }),
    new CleanWebpackPlugin(),
    new FriendlyErrorsWebpackPlugin(), // 美化打包结果，一定要配合 stats: 'errors-only' 使用
  ],
	output: {
    filename: 'dist.js',
		path: path.resolve(__dirname, '../dist')
	}
}