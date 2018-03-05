import { combineReducers } from "redux";

const isLoading = (state = false, action) => {
	switch (action.type) {
		case "FETCH_POSTS_REQUEST":
		case "NEW_POST_REQUEST":
		case "UPDATE_POST_REQEUST":
		case "UPLOAD_IMAGE_REQEUST":
			return true;
		case "FETCH_POSTS_SUCCESS":
		case "NEW_POST_SUCCESS":
		case "UPDATE_POST_SUCCESS":
		case "UPLOAD_IMAGE_SUCCESS":
		case "FETCH_POSTS_ERROR":
		case "NEW_POST_ERROR":
		case "UPDATE_POST_ERROR":
		case "UPLOAD_IMAGE_ERROR":
			return false;
		default:
			return state;
	}
};

const error = (state = null, action) => {
	if (action.type === "RESET_ERROR") {
		return null;
	} else if (action.error) {
		return action.error;
	}

	return state;
};

const network = combineReducers({
	isLoading,
	error
});

export const getIsLoading = state => {
	return state.network.isLoading;
};

export const getError = state => {
	return state.network.error;
};

export default network;
