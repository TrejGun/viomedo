import {Router} from "express";
import {makeError} from "../utils/error";
import {sendError} from "../utils/wrapper";


export default function (app, prefix) {
	const router = Router(); // eslint-disable-line new-cap

	router.use((request, response, next) => {
		next(makeError("page-not-found", 404));
	});

	app.use(prefix, router);

	app.use(prefix, sendError);
}
