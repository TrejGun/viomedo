import fs from "fs";
import path from "path";
import {Router} from "express";


export default function (app, prefix) {
	const router = Router(); // eslint-disable-line new-cap

	fs.readdirSync(path.join(__dirname, `./public`)).forEach(file => {
		require(path.join(__dirname, `./public`, file)).default(router);
	});

	app.use(prefix, router);
}
