const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");


module.exports = {
	devtool: "source-map",
	entry: {
		client: ["./client/client"]
	},
	output: {
		path: path.join(__dirname, "..", "..", "build", "bundle"),
		filename: "[name].js",
		sourceMapFilename: "[file].map",
		chunkFilename: "[id].js",
		publicPath: "/bundle/"
	},
	externals: {
		// require("jquery") is external and available
		// on the global var jQuery
		jquery: "jQuery",
		react: "React",
		"react-dom": "ReactDOM",
		// "react-bootstrap": "ReactBootstrap",
		// redux: "Redux",
		// "redux-thunk": "ReduxThunk",
		// "redux-logger": "reduxLogger",
		moment: "moment",
		// inlt: "IntlPolyfill",
		// "intl-locales-supported": "areIntlLocalesSupported",
		// "react-intl": "ReactIntl"
		lodash: "_"
	},
	resolve: {
		extensions: [".json", ".jsx", ".js"],
		modules: [
			"node_modules"
		]
	},
	module: {
		rules: [{
			test: /\.json$/,
			use: [{
				loader: "json-loader"
			}]
		}, {
			test: /\.(le|c)ss$/,
			use: ExtractTextPlugin.extract({
				fallback: "style-loader",
				use: [{
					loader: "css-loader",
					options: {
						importLoaders: 1
						// sourceMap: true
					}
				}, {
					// https://github.com/postcss/postcss-loader/issues/217
					loader: "postcss-loader",
					options: {
						// sourceMap: true
					}
				}, {
					loader: "less-loader",
					options: {
						// sourceMap: true
					}
				}]
			})
		}, {
			test: /\.(ttf|woff|woff2|eot|svg|gif|png|ico)(\?.+)?$/,
			use: [{
				loader: "file-loader?name=[name].[ext]?[hash]"
			}]
		}, {
			test: /\.jsx?$/,
			exclude: [/node_modules/],
			use: [{
				loader: "babel-loader",
				options: {
					babelrc: false,
					presets: ["react", [
						"env",
						{
							targets: {
								browsers: ["last 2 versions"]
							}
						}
					]],
					plugins: [
						"transform-decorators-legacy",
						"transform-class-properties",
						"transform-function-bind",
						"transform-object-rest-spread",
						"transform-runtime",
						"lodash"
					]
				}
			}]
		}]
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}}),
		new webpack.optimize.CommonsChunkPlugin("vendor"),
		new webpack.NoEmitOnErrorsPlugin(),
		new ExtractTextPlugin({
			filename: "[name].css",
			allChunks: true
		}),
		new webpack.DefinePlugin({
			"process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
		})
	],
	performance: {
		hints: false
	}
};
