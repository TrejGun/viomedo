import {makeError} from "../../utils/error";


export function checkModel() {
	return function checkModelInner(model) {
		if (!model) {
			throw makeError("not-found", 404, {name: this.constructor.name.slice(0, -10).toLowerCase()});
		}
	};
}

