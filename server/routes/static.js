import path from "path";
import express from "express";
import webpack from "../configs/webpack";


export default function (app) {
	if (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "staging") {
		app.use("/bundle", express.static(path.join(__dirname, "../../bundle")));
	}

	if (process.env.NODE_ENV === "development") {
		webpack(app);
	}

	app.use("/", express.static(path.join(__dirname, "../../static")));
}
