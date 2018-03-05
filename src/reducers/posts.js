import { combineReducers } from "redux";

const byId = (state = {}, action) => {
	if (action.response) {
		return {
			...state,
			...action.response.entities.posts,
		};
	}
	return state;
};

const allIds = (state = [], action) => {
	switch (action.type) {
		case "FETCH_POSTS_SUCCESS":
			return action.response.result;
		case "NEW_POST_SUCCESS":
			return state.concat(action.response.result);
		case "DELETE_POST_SUCCESS":
			return state.filter(id => id !== action.response.result);
		default:
			return state;
	}
};

const posts = combineReducers({
	byId,
	allIds,
});

export const getAllPosts = (state) => {
	const posts = state.entities.posts;
	return posts.allIds.map(id => posts.byId[id]);
}

export const getById = (state, id) => {
	const posts = state.entities.posts;
	return posts.byId[id];
}

export default posts;

