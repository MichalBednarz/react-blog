import * as userApi from "../api/user";

export const login = (email, password, history) => dispatch => {
    dispatch({
        type: "LOGIN_REQUEST"
    });
    return userApi.login(email, password).then(
        user => {
            console.log(user);
            if (user && user.token) {
                dispatch({
                    type: "LOGIN_SUCCESS",
                    user,
                    credentials: { email, password }
                });
                sessionStorage.setItem("user", JSON.stringify(user));
                history.push("/posts");
            }
        },
        error => {
            dispatch({
                type: "LOGIN_ERROR",
                error: error
            });
        }
    );
};

export const getAll = () => dispatch => {
    return userApi.getAll().then(
        users => {
            dispatch({
                type: "GET_ALL_USERS_SUCCESS",
                users
            });
        },
        error => {
            dispatch({
                type: "GET_ALL_USERS_ERROR",
                error: error
            });
        }
    );
};

export const signout = () => dispatch => {
    dispatch({
        type: "LOGOUT"
    });
    window.sessionStorage.removeItem("user");
};


