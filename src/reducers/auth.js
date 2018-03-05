const auth = (state={}, action) => {
  switch(action.type) {
    case "LOGIN_REQUEST":
      return { isLoginPending: true };
    case "LOGIN_SUCCESS":
      return { authenticated: true, user: {...action.user, ...action.credentials}};
    case "LOGIN_ERROR":
      return { error: action.error };
    case "LOGOUT":
      return {};
     default:
     	return state;
     }
}

export const getCurrentUser = (state) => {
  return state.user.email;
}

export default auth;
