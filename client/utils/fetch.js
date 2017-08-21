import $ from "jquery";
import {MESSAGE_ADD_ALL, VALIDATION_ADD_ALL} from "../actions/constants";

function readCookie(name) {
	const match = document.cookie.match(new RegExp(`(^|;\\s*)(${name})=([^;]*)`));
	return match ? decodeURIComponent(match[3]) : null;
}

export default ({action, storeName, method = "GET", name, data = {}}, dispatch) => {

	dispatch({
		type: `${storeName}_${name}_start`,
		action,
		isLoading: true,
		success: false,
		data
	});

	return $.ajax({
		method,
		data: method === "GET" ? data : JSON.stringify(data),
		url: `/api-v1${action}`,
		dataType: "json",
		cache: false,
		contentType: "application/json;charset=utf-8",
		headers: {
			"X-XSRF-TOKEN": readCookie("XSRF-TOKEN")
		},
		xhrFields: {
			withCredentials: true
		}
	})
		.then(response => {
			// console.log("response", response);
			dispatch({
				type: `${storeName}_${name}_success`,
				name,
				isLoading: false,
				success: true,
				data: response
			});
			return response;
		})
		.catch(error => {
			console.error(error);
			dispatch({
				type: error.status === 409 ? VALIDATION_ADD_ALL : MESSAGE_ADD_ALL,
				data: error.responseJSON.errors
			});
			dispatch({
				type: `${storeName}_${name}_error`,
				name,
				isLoading: false,
				success: false
			});
		});
};
