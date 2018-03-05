import { authHeader } from "../helpers/authHeader";
import handleResponse from "../helpers/handleResponse";
import sleeper from "../helpers/sleeper";

const URL = "http://localhost:8000/api/";

export const login = (email, password) => {
	const requestOptions = {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			email: email,
			password: password
		})
	};

	return fetch(`${URL}authenticate`, requestOptions)
		.then(sleeper(1000))
		.then(handleResponse);
};

export const getAll = () => {
	const requestOptions = {
		method: "GET",
		headers: authHeader()
	};

	return fetch(`${URL}authenticate`, requestOptions).then(handleResponse);
};

const getById = id => {
	const requestOptions = {
		method: "GET",
		headers: authHeader()
	};

	return fetch(`${URL}/users/${id}`, requestOptions).then(handleResponse);
};

const register = user => {
	const requestOptions = {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(user)
	};

	return fetch(`${URL}/users/register`, requestOptions).then(handleResponse);
};

const update = user => {
	const requestOptions = {
		method: "PUT",
		headers: { ...authHeader(), "Content-Type": "application/json" },
		body: JSON.stringify(user)
	};

	return fetch(`${URL}/users/${user.id}`, requestOptions).then(
		handleResponse
	);
};

// prefixed function name with underscore because delete is a reserved word in javascript
const _delete = id => {
	const requestOptions = {
		method: "DELETE",
		headers: authHeader()
	};

	return fetch(`${URL}/users/${id}`, requestOptions).then(handleResponse);
};