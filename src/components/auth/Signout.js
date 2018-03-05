import React from "react";
import * as userActions from "../../actions/userActions";
import { connect } from "react-redux";

const Signout = (props) => {
	props.signout();
	return <p>Logged out...</p>
}


export default connect(null, { signout: userActions.signout })(Signout);

