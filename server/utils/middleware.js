import {makeError} from "./error";


export function methodNotAllowed(request, response, next) {
	return next(makeError("method-not-allowed", 405));
}
