const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const prodConfig = {
	mode: 'production',
	devtool: 'cheap-module-source-map',
	optimization: {
		minimizer: [new OptimizeCSSAssetsPlugin({
			assetNameRegExp: /\.css$/g,
			cssProcessor: require('cssnano')
		})] // css压缩
	},
}

module.exports = prodConfig;
