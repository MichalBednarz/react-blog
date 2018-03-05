import React, { Component } from "react";
import { connect } from "react-redux";

const authorized = WrappedComponent => {
	class authorized extends Component {
		componentWillMount() {
			const {authenticated} = this.props;
			if (!authenticated) {
				this.props.history.push("/signin");
			}
		}

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
	return connect(mapStateToProps)(authorized);
};

export default authorized;
