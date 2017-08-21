import {combineReducers} from "redux";
import {routerReducer as routing} from "react-router-redux";
import intl from "./intl";
import applications from "./applications";
import validations from "./validations";


export default combineReducers({
	applications,
	intl,
	routing,
	validations
});
