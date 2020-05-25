const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
	entry: {
    main: './src/index.js',
    another: './src/another-module.js'
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
	plugins: [
		new HtmlWebpackPlugin({
      template: './index.html', // 以template中的html为模板，打包后生成index.html
    }),
    new CleanWebpackPlugin(),
  ],
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      minRemainingSize: 0,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 6,
      maxInitialRequests: 4,
      automaticNameDelimiter: '~',
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
	output: {
    filename: '[name].bundle.js',
		path: path.resolve(__dirname, '../dist')
	}
}