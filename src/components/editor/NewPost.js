import React, { Component } from "react";
import { connect } from "react-redux";
import * as postActions from "../../actions/postActions";
import { reduxForm } from "redux-form";
import PostForm from "../../containers/PostForm";

class UpdatePost extends Component {
	constructor(props) {
		super(props);
		this.state = {
			imageUrl: ""
		}
		this.submit = this.submit.bind(this);
		this.onDrop = this.onDrop.bind(this);
	}

	onDrop(file) {
		const { uploadImage } = this.props;

		uploadImage(file[0]).then(imageUrl =>
			this.setState({
				imageUrl: imageUrl
			})
		);
	};

	submit(values) {
		const { newPost, history } = this.props;
		const { imageUrl } = this.state;
		newPost({ ...values, imageUrl }, history);
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

const mapDispatchToProps = dispatch => {
	return {
		newPost: (payload, history) =>
			dispatch(postActions.newPost(payload, history)),
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

	if(!values.text) {
		errors.text = "Required";
	}
	return errors;
};

UpdatePost = connect(null, mapDispatchToProps)(
	reduxForm({
		form: "new-post",
		enableReinitialize: true,
		validate
	})(UpdatePost)
);

export default UpdatePost;
