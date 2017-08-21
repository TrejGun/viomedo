import winston from "winston";
import {makeError, processValidationError, processDatabaseError} from "./error";


function _send(request, response) {
	return (status, errors) =>
		response.status(status).send({status, errors});
}

export function sendError(error, request, response, next) { // eslint-disable-line no-unused-vars
	// if (process.env.NODE_ENV !== "test") {
		winston.error(error);
	// }
	const send = _send(request, response);
	if (error.name === "SequelizeValidationError") {
		console.log(processValidationError(error))
		return send(409, processValidationError(error));
	}
	if (error.name === "SequelizeDatabaseError") {
		return send(500, processDatabaseError(error));
	}
	if (!error.status) {
		if (process.env.NODE_ENV === "production") {
			return send(500, [makeError("server-error", 500)]);
		} else {
			return send(500, [new Error(error.stack)]);
		}
	}
	return send(error.status, [error]);
}


export function wrapJSON(method) {
	return (request, response, next) =>
		method(request, response, next)
			.then(response.json.bind(response))
			.catch(error => sendError(error, request, response));
}
