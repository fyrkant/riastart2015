module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			}
			/*,{
				test: /\.css$/,
				exclude: /node_modules/,
				loader: 'style-loader!css-loader'
			}*/
		]
	}
};