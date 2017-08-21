import winston from "winston";
import bluebird from "bluebird";
import "../../server/init/winston";


Error.stackTraceLimit = Infinity;

winston.error(`Test date: ${new Date().toISOString()}`);
winston.error(`Test NODE_ENV: ${process.env.NODE_ENV}`);

bluebird.config({
	warnings: true,
	longStackTraces: true,
	cancellation: true,
	monitoring: true
});

process.on("uncaughtException", winston.error);
