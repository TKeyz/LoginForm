const path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var extractPlugin = new ExtractTextPlugin({
	filename: 'main.css'
});

module.exports = {
	entry: {
		app: './src/js/main.js'
	},
	output: {
		path: path.resolve(__dirname, 'assets'),
		filename: 'bundle.js',
		publicPath: '/assets'
	},

	module: {
		rules: [
			{
				test: /\.js?$/,
				use: [
					{
						loader: "babel-loader",
						options: {
							presets: ['es2015']
						}
					}
				]
			},
			{
				test: /\.scss$/,
				use: extractPlugin.extract({
					use: ['css-loader','sass-loader']
				})
			}
		]
	},
	plugins: [
		extractPlugin
	]
};