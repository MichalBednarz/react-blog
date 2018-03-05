import React, { Component } from "react";
import { RaisedButton } from "material-ui";
import * as userActions from "../../actions/userActions";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { TextField } from "redux-form-material-ui";

const containerStyle = {
	margin: "auto",
	width: "25%",
	padding: "10px"
};

class Signin extends Component {
	constructor(props) {
		super(props)
		this.submit = this.submit.bind(this);
	}
	submit(values) {
		const { email, password } = values;
		const { login, history } = this.props;
		login(email, password, history);
	};

	errorMessage() {
		if (this.props.errorMessage) {
			return <div className="info-red">{this.props.errorMessage}</div>;
		}
	}
	render() {
		const { handleSubmit } = this.props;

		return (
			<div style={containerStyle}>
				<form onSubmit={handleSubmit(this.submit)}>
					<Field
						name="email"
						component={TextField}
						hintText="Email"
					/>
					<Field
						name="password"
						component={TextField}
						hintText="Password"
					/>
					<RaisedButton
						label="SIGN IN"
						primary={true}
						type="submit"
					/>
				</form>
			</div>
		);
	}
}

const validate = values => {
	const errors = {};
	if (!values.password) {
		errors.password = "Required";
	}

	if (!values.email) {
		errors.email = "Required";
	} else if (
		!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
	) {
		errors.email = "Invalid email address";
	}
	return errors;
};

const mapStateToProps = state => {
	return {
		errorMessage: state.auth.error
	};
};

const mapDispatchToProps = dispatch => {
	return {
		login: (email, password, history) => dispatch(userActions.login(email, password, history))
	};
};

Signin = connect(mapStateToProps, mapDispatchToProps)(
	reduxForm({
		form: "signin",
		validate
	})(Signin)
);

export default Signin;
