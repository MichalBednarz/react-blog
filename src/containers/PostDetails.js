import React, { Component } from "react";
import Post from "../components/guest/Post";
import { connect } from "react-redux";
import * as postActions from "../actions/postActions";
import { getById } from "../reducers/posts";

class PostDetails extends Component {
	constructor(props) {
		super(props);
		this.fetchData = this.fetchData.bind(this);
	}

	componentDidMount() {
		this.fetchData();
	}

	fetchData() {
		const { fetchPosts } = this.props;
		fetchPosts();
	}

	render() {
		const { post } = this.props;
		return (
			<div style={{ margin: "auto" }}>
				<Post post={post} />
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	const postId = ownProps.match.params.id;
	return {
		post: getById(state, postId),
	};
};

const mapDispatchToProps = dispatch => {
	return {
		fetchPosts: () => dispatch(postActions.getAll()),
	};
};

PostDetails = connect(mapStateToProps, mapDispatchToProps)(PostDetails);

export default PostDetails;
