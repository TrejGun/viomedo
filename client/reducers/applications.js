import {replaceOrAppend, replaceAll, remove} from "../utils/reducer";


const applications = {
	list: [],
	count: 1,
	isLoading: true,
	success: false,
	name: ""
};

export default function applicationsReducer(state = applications, action) {
	switch (action.type) {
		case "applications_view_start":
			return Object.assign({}, state, {
				isLoading: action.isLoading,
				success: action.success,
				list: [],
				count: 0,
				name: action.name
			});
		case "applications_view_success":
			return Object.assign({}, state, {
				isLoading: action.isLoading,
				success: action.success,
				list: replaceOrAppend(state, action.data),
				count: 1,
				name: action.name
			});
		case "applications_view_error":
			return Object.assign({}, state, {
				isLoading: action.isLoading,
				success: action.success,
				name: action.name
			});
		case "applications_list_start":
			return Object.assign({}, state, {
				isLoading: action.isLoading,
				success: action.success,
				name: action.name
			});
		case "applications_list_success":
			return Object.assign({}, state, {
				isLoading: action.isLoading,
				success: action.success,
				list: replaceAll(state, action.data.list),
				count: action.data.count,
				name: action.name
			});
		case "applications_list_error":
			return Object.assign({}, state, {
				isLoading: action.isLoading,
				success: action.success,
				name: action.name
			});
		case "applications_update_start":
			return Object.assign({}, state, {
				isLoading: action.isLoading,
				success: action.success,
				name: action.name
			});
		case "applications_update_success":
			return Object.assign({}, state, {
				isLoading: action.isLoading,
				success: action.success,
				list: replaceOrAppend(state, action.data),
				count: action.data.count,
				name: action.name
			});
		case "applications_update_error":
			return Object.assign({}, state, {
				isLoading: action.isLoading,
				success: action.success,
				name: action.name
			});
		case "applications_create_start":
			return Object.assign({}, state, {
				isLoading: action.isLoading,
				success: action.success,
				name: action.name
			});
		case "applications_create_success":
			return Object.assign({}, state, {
				isLoading: action.isLoading,
				success: action.success,
				list: replaceOrAppend(state, action.data),
				name: action.name
			});
		case "applications_create_error":
			return Object.assign({}, state, {
				isLoading: action.isLoading,
				success: action.success,
				name: action.name
			});
		case "applications_delete_start":
			return Object.assign({}, state, {
				isLoading: action.isLoading,
				success: action.success,
				name: action.name
			});
		case "applications_delete_success":
			return Object.assign({}, state, {
				isLoading: action.isLoading,
				success: action.success,
				list: remove(state, action.data),
				name: action.name
			});
		case "applications_delete_error":
			return Object.assign({}, state, {
				isLoading: action.isLoading,
				success: action.success,
				name: action.name
			});
		default:
			return state;
	}
}
