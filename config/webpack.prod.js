const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const prodConfig = {
  mode: 'production',
  devtool: 'cheap-module-source-map',
  module: {
    rules: [{
      test: /\.less$/,
      use: [
        {
          loader: 'style-loader',
          options: {
            inserAt: 'top', // 样式插入到<head>
            singleton: true, // 将所有到style标签合并成一个
          },
        },
        'css-loader',
        'less-loader', 
      ],
    }],
  },
  optimization: {
    minimizer: [new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
    })], // css压缩
  },
};

module.exports = prodConfig;
