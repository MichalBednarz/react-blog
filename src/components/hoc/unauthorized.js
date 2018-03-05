import React, { Component } from "react";
import { connect } from "react-redux";

const unauthorized = WrappedComponent => {
	class unauthorized extends Component {
		componentWillMount() {
			const { authenticated } = this.props;
			if (authenticated) {
				this.props.history.push("/");
			}
		}

		// componentWillUpdate() {
		// 	const { auth } = this.props.authenticated;
		// 	if (auth) {
		// 		this.props.history.push("/");
		// 	}
		// }

		/* 
        	componentWillUpdate ?
        */

		render() {
			return <WrappedComponent {...this.props} />;
		}
	}

	const mapStateToProps = state => {
		return {
			authenticated: state.auth.authenticated
		};
	};
	return connect(mapStateToProps)(unauthorized);
};

export default unauthorized;
