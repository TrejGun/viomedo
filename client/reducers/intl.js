import {enabledLanguages, defaultLanguage} from "../../intl/language";
import {localization} from "../../intl/setup";
import {SWITCH_LANGUAGE} from "../actions/IntlActions";

const initLocale = global.navigator && global.navigator.language || defaultLanguage;

const initialState = {
	locale: initLocale,
	enabledLanguages,
	...(localization[initLocale] || {})
};

export default function (state = initialState, action) {
	switch (action.type) {
		case SWITCH_LANGUAGE: {
			const {type, ...actionWithoutType} = action; // eslint-disable-line
			return {...state, ...actionWithoutType};
		}
		default:
			return state;
	}
}
