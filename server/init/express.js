import express from "express";
import logger from "morgan";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import queryTypes from "query-types";


export default function () {
	const app = express();

	app.disable("x-powered-by");

	app.use(logger("tiny")); // "default", "short", "tiny", "dev"

	app.use(cookieParser("keyboardcat"));
	app.use(queryTypes.middleware());
	app.use(bodyParser.text());
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({
		extended: true
	}));

	return app;
}
