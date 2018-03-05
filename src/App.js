import React from "react";
import Header from "./components/Header";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Routes from "./Routes";
import {BrowserRouter as Router }  from "react-router-dom";


const App = () => (
	<Router>
		<MuiThemeProvider>
			<div>
				<Header />
				<Routes />
			</div>
		</MuiThemeProvider>
	</Router>
);

export default App;
