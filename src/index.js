import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./reducers/";

let store = createStore(rootReducer, applyMiddleware(thunk, logger));

const persistedUser = sessionStorage.getItem('user');

if(persistedUser) {
 store.dispatch({ type: "AUTHENTICATED" });
}

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById("root")
);
