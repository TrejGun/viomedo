import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import configHot from "./webpack.hot";
import configDev from "./webpack.development";


export default function (app) {
	// Run Webpack dev server only in development mode
	if (process.env.NODE_ENV === "development") {
		const compiler = webpack(configDev);
		app.use(webpackDevMiddleware(compiler, configHot));
		app.use(webpackHotMiddleware(compiler));
	}
}

