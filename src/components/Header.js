import "../styles/Header.css";
import React, { Component } from "react";
import { AppBar, FlatButton } from "material-ui";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const buttonStyle = {
	backgroundColor: "transparent",
	color: "white"
};

const rightButtonsStyle = { display: "flex", flexDirection: "row" };

class Header extends Component {
	links() {
		const auth = this.props.authenticated;
		if (auth) {
			return (
				<div>
					<FlatButton
						label="Sign out"
						containerElement={<Link to="/signout" />}
						style={buttonStyle}
					/>
					<FlatButton
						label="ADMIN"
						containerElement={<Link to="/editor/posts" />}
						style={buttonStyle}
					/>
				</div>
			);
		}

		return (
			<div>
				<FlatButton
					label="Sign in"
					containerElement={<Link to="/signin" />}
					style={buttonStyle}
				/>
				<FlatButton
					label="Sign up"
					containerElement={<Link to="/signup" />}
					style={buttonStyle}
				/>
			</div>
		);
	}
	render() {
		const rightButtons = (
			<div style={rightButtonsStyle}>
				<div>
					<FlatButton
						label="About"
						containerElement={<Link to="/about" />}
						style={buttonStyle}
					/>
					<FlatButton
						label="Home"
						containerElement={<Link to="/posts" />}
						style={buttonStyle}
					/>
				</div>
				{this.links()}
			</div>
		);
		return <AppBar title="React blog" iconElementRight={rightButtons} />;
	}
}

const mapStateToProps = state => {
	return {
		authenticated: state.auth.authenticated
	};
};

Header = connect(mapStateToProps)(Header);

export default Header;
