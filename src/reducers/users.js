const users = (state = [], action) => {
	switch(action.type) {
		case "GET_ALL_USERS_SUCCESS":
			return action.users
		default:
			return state;
	}
}

export default users;