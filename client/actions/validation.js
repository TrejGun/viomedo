import {VALIDATION_REMOVE} from "./constants";

export const removeValidation = data =>
	dispatch =>
		dispatch({
			type: VALIDATION_REMOVE,
			data
		});
