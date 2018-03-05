import handleResponse from "../helpers/handleResponse";
import { authHeader } from "../helpers/authHeader";
const URL = "http://localhost:8000/api/";

export const getAll = () => {
	const requestOptions = {
		method: "GET",
		headers: authHeader()
	};

	return fetch(`${URL}posts`, requestOptions).then(handleResponse);
};

export const newPost = (payload) => {
	console.log(payload)
	return fetch(`${URL}posts`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			...payload
		})
	}).then(response => response.json());	
}

export const updatePost = (id, payload) => {
	return fetch(`${URL}posts/${id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			...payload
		})
	}).then(response => response.json());
};
