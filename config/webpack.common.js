const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    main: './src/index.tsx',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    mainFiles: ['index'],
  },
  module: {
    rules: [{
      test: /\.(jpg|png|gif)$/,
      use: {
        loader: 'url-loader',
        options: {
          name: '[name]_[hash].[ext]',
          outputPath: 'images/',
          limit: 2048, // 2048 === 2kb，如果文件超过这个大小，就会打包成文件。不然就打包成inline JS的base64的 Data URL
        },
      },
    }, {
      test: /\.(eot|ttf|svg|woff)$/,
      use: {
        loader: 'file-loader',
        options: {
          name: '[name]_[hash].[ext]',
          outputPath: 'font/',
        },
      },
    }, {
      test: /\.jsx?$/,
      exclude: /node_modules/, // 忽略node_modules
      use: ['babel-loader',
        // { // 这样会降低打包速度
        //   loader: 'eslint-loader',
        //   force: 'pre', // 强制执行顺序，第一个执行
        //   options: {
        //     fix: true, // 自动修复错误
        //     cache: true,
        //   }
        // }
      ],
    }, {
      test: /\.tsx?$/,
      exclude: /node_modules/, // 忽略node_modules
      loader: 'ts-loader',
    }, {
      test: /\.less$/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader, // 提取 js 中引入的 css 打包到单独文件中，然后通过标签 <link> 添加到头部
          options: {
            hmr: true, // 只在开发模式中启用热更新
            reloadAll: true, // 如果模块热更新不起作用，重新加载全部样式
          },
        },
        // {
        //   loader: 'style-loader' // 将css-loader打包好的css代码以<style>标签的形式插入到html文件中
        // },
        {
          loader: 'css-loader', // babel css
          options: {
            importLoaders: 2,
          },
        },
        'less-loader',
        {
          loader: 'postcss-loader',
          options: {
            ident: 'postcss',
            plugins: [
              require('autoprefixer')({
                browsers: ['last 2 version', '>1%', 'ios 7'],
              }),
            ],
          },
        },
      ],
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    // }, {
    //   test: /\.scss$/,
    //   use: [
    //     {
    //       loader: 'style-loader'
    //     }, {
    //       loader: 'css-loader',
    //       options: {
    //         importLoaders: 2, // 0 => 无 loader(默认); 1 => postcss-loader; 2 => postcss-loader, sass-loader
    //         // modules: true, // 启用 CSS modules
    //       }
    //     }, {
    //       loader: 'postcss-loader',
    //       options: {
    //         ident: 'postcss',
    //         plugins: [
    //           require('autoprefixer'),
    //         ]
    //       }
    //     }, {
    //       loader: 'sass-loader'
    //     }
    //   ]
    }],
  },
  // stats: 'errors-only', // 打包日志如何显示
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../index.html'), // 以template中的html为模板，打包后生成index.html
      filename: 'index.html',
      chunks: ['index'],
      inject: true,
      minify: {
        html5: true,
        collapseWhitespace: true,
        preserveLineBreaks: false,
        minifyCSS: true,
        minifyJS: true,
        removeComments: false,
      },
    }),
    new CleanWebpackPlugin(),
    // new FriendlyErrorsWebpackPlugin(), // 美化打包结果，一定要配合 stats: 'errors-only' 使用
    // new BundleAnalyzerPlugin({ // 打包分析
    //   analyzerHost: '127.0.0.1',
    //   analyzerPort: 8889,
    //   openAnalyzer: true,
    // }),
    new MiniCssExtractPlugin({ // css 分割
      filename: '[name]_[contenthash:8].css', // 直接引用【index.html（入口文件） 引入的名字】
      chunkFilename: '[name]_[contenthash:8].chunk.css', // 间接引用【其他地方引入使用的名字】
    }),
  ],
  output: {
    filename: '[name]_[contenthash:8].js', // [hash] 当内容有改动时，hash会改变
    chunkFilename: '[name]_[contenthash:8].js',
    path: path.resolve(__dirname, '../dist'),
  },
};
