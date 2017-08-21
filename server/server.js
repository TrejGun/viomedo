import "./init/winston";
import winston from "winston";
import express from "./init/express";


const app = express();

["cors", "pre", "main", "public", "static", "fe", "404"].forEach(name => {
	require(`./routes/${name}.js`).default(app, "/api-v1/");
});

const listener = app.listen(process.env.PORT, () => {
	winston.info(`Express server listening on port ${listener.address().port}`);
});

process.on("unhandledRejection", winston.error);
process.on("uncaughtException", winston.error);

export default app;
