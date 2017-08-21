import path from "path";
import {Router} from "express";


export default function (app) {
	const router = Router(); // eslint-disable-line new-cap

	router.route("/ping")
		.get((request, response) => {
			response.status(200).json({pong: true});
		});

	router.route("/favicon.ico")
		.get((request, response) => {
			response.sendFile(path.join(__dirname, "../../static/img/favicon.ico"));
		});

	app.use("/", router);
}
