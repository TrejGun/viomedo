export function makeError(message, status = 400, data = {}) {
	return Object.assign(new Error(), {message, status, ...data});
}

export function processValidationError(error) {
	return Object.keys(error.errors).map(key => ({
		name: error.errors[key].path,
		message: "invalid-param",
		reason: error.errors[key].message ? error.errors[key].message : error.errors[key].type
	})).filter((value, index, self) => self.findIndex(e => e.name === value.name) === index);
}

export function processDatabaseError(error) {
	return error;
}