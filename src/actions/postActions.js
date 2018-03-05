import * as postApi from "../api/post";
import * as cloudinaryApi from "../api/cloudinary";
import { normalize } from "normalizr";
import * as schema from "./schema";

export const getAll = () => dispatch => {
	dispatch({
		type: "FETCH_POSTS_REQUEST"
	});

	return postApi.getAll().then(
		response => {
			dispatch({
				type: "FETCH_POSTS_SUCCESS",
				response: normalize(response, schema.arrayOfPosts)
			});
		},
		error => {
			dispatch({
				type: "FETCH_POSTS_ERROR",
				error: error.message
			});
		}
	);
};

export const newPost = (payload, history) => dispatch => {
	dispatch({
		type: "NEW_POST_REQUEST"
	});

	return postApi.newPost(payload).then(
		response => {
			dispatch({
				type: "NEW_POST_SUCCESS",
				response: normalize(response, schema.post)
			});
			history.push("/editor/posts");
		},
		error => {
			dispatch({
				type: "NEW_POST_ERROR",
				error: error.message
			});
		}
	);
};

export const updatePost = (id, payload, history) => dispatch => {
	dispatch({
		type: "UPDATE_POST_REQUEST"
	});

	return postApi.updatePost(id, payload).then(
		response => {
			dispatch({
				type: "UPDATE_POST_SUCCES",
				response: normalize(response, schema.post)
			});
			history.push("/editor/posts")
		},
		error => {
			dispatch({
				type: "UPDATE_POST_ERROR",
				error: error.message
			});
		}
	);
};

export const uploadImage = (file) => dispatch => {
	dispatch({
		type: "UPLOAD_IMAGE_REQEUST"
	});

	return cloudinaryApi.uploadImage(file).then(
		response => {
			dispatch({
				type: "UPLOAD_IMAGE_SUCCESS",
			});

			return response.secure_url
		},
		error => {
			dispatch({
				type: "UPLOAD_IMAGE_ERROR",
				error: error.message
			});
		}
	);
};
