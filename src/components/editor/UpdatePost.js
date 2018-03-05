import React, { Component } from "react";
import { connect } from "react-redux";
import * as postActions from "../../actions/postActions";
import { getById } from "../../reducers/posts";
import { reduxForm } from "redux-form";
import PostForm from "../../containers/PostForm";

class UpdatePost extends Component {
	constructor(props) {
		super(props);
		this.state = {
			imageUrl: ""
		};
		this.fetchData = this.fetchData.bind(this);
		this.onDrop = this.onDrop.bind(this);
		this.submit = this.submit.bind(this);
	}

	componentDidMount() {
		this.fetchData();
	}

	componentWillReceiveProps(nextProps) {
		const { post } = nextProps;
		if (post) {
			this.setState({
				imageUrl: post.imageUrl
			});
		}
	}

	fetchData() {
		const { fetchPosts } = this.props;
		fetchPosts();
	}

	onDrop(file) {
		const { uploadImage } = this.props;

		uploadImage(file[0]).then(imageUrl =>
			this.setState({
				imageUrl
			})
		);
	};

	submit(values) {
		const { updatePost, postId, history } = this.props;
		const { imageUrl } = this.state;
		updatePost(postId, { ...values, imageUrl }, history);
	};

	render() {
		const { handleSubmit } = this.props;
		const { imageUrl } = this.state;
		return (
			<PostForm
				submit={this.submit}
				onDrop={this.onDrop}
				handleSubmit={handleSubmit}
				imageUrl={imageUrl}
			/>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	const postId = ownProps.match.params.id;
	return {
		post: getById(state, postId),
		initialValues: { ...getById(state, postId) },
		postId
	};
};

const mapDispatchToProps = dispatch => {
	return {
		fetchPosts: () => dispatch(postActions.getAll()),
		updatePost: (id, payload, history) =>
			dispatch(postActions.updatePost(id, payload, history)),
		uploadImage: (postId, file) =>
			dispatch(postActions.uploadImage(postId, file))
	};
};

const validate = values => {
	const errors = {};
	if (!values.title) {
		errors.title = "Required";
	}

	if (!values.leadSentence) {
		errors.leadSentence = "Required";
	}

	if (!values.text) {
		errors.text = "Required";
	}
	return errors;
};

UpdatePost = connect(mapStateToProps, mapDispatchToProps)(
	reduxForm({
		form: "update-post",
		enableReinitialize: true,
		validate
	})(UpdatePost)
);

export default UpdatePost;
