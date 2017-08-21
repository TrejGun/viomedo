import path from "path";
import webpack from "webpack";
import ExtractTextPlugin from "extract-text-webpack-plugin";


export default {
	devtool: "cheap-module-source-map",
	entry: {
		client: ["react-hot-loader/patch", "webpack-hot-middleware/client", "./client/client"]
	},
	output: {
		path: path.join(__dirname, "..", "..", "..", "build", "bundle"),
		filename: "[name].js",
		sourceMapFilename: "[file].map",
		chunkFilename: "[id].js",
		publicPath: "/bundle/"
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
					presets: [[
						"env",
						{
							modules: false,
							targets: {
								browsers: ["last 2 versions"]
							}
						}
					], "react"],
					plugins: [
						"react-hot-loader/babel",
						"transform-decorators-legacy",
						"transform-class-properties",
						"transform-function-bind",
						"transform-object-rest-spread",
						"lodash"
					]
				}
			}]
		}]
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin("vendor"),
		new webpack.NoEmitOnErrorsPlugin(),
		new ExtractTextPlugin({
			filename: "[name].css",
			allChunks: true
		}),
		new webpack.DefinePlugin({
			"process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
		}),
		new webpack.HotModuleReplacementPlugin()
	],
	performance: {
		hints: false
	}
};
