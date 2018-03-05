import React, { Component } from "react";
import { connect } from "react-redux";
import * as postActions from "../actions/postActions";
import { getAllPosts } from "../reducers/posts";
import { getError, getIsLoading } from "../reducers/network";
import Pagination from "material-ui-pagination";
import PostList from "../components/editor/PostList";

class EditorPostList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			total: 0,
			display: 7,
			current: 1
		};
		this.fetchData = this.fetchData.bind(this);
		this.handleRowSelection = this.handleRowSelection.bind(this);
		this.computeTotalPages = this.computeTotalPages.bind(this);
		this.getCurrentPosts = this.getCurrentPosts.bind(this);
	}
	componentDidMount() {
		this.fetchData();
	}

	componentWillReceiveProps(nextProps) {
		const { posts } = nextProps;
		const totalPages = this.computeTotalPages(posts.length);
		if (posts) {
			this.setState({
				total: totalPages
			});
		}
	}

	componentDidUpdate() {
		window.scrollTo(0, 0);
	}

	computeTotalPages(totalItems) {
		const { display } = this.state;
		const totalPages = Math.ceil(totalItems / display);

		return totalPages;
	}

	getCurrentPosts(posts) {
		const { current, display } = this.state;

		return posts.slice((current - 1) * display, current * display);
	}

	fetchData() {
		const { fetchPosts } = this.props;
		fetchPosts();
	}

	handleRowSelection(selectedRows) {
		const { current, display } = this.state;
		const selectedPost = selectedRows[0] + (current - 1) * display;
		const postId = this.props.posts[selectedPost].id;
		this.props.history.push(`/editor/posts/${postId}/edit`);
	}

	handlePageChange(current) {
		this.setState({
			current
		});
	}

	render() {
		const { posts, error, isLoading } = this.props;
		const currentPosts = this.getCurrentPosts(posts);

		if (!posts.length && isLoading) {
			return <p>Loading...</p>;
		}
		if (!posts.length && error) {
			return <p>{error}</p>;
		}

		return (
			<div style={{ width: "50%", margin: "auto" }}>
				<PostList
					posts={currentPosts}
					handleRowSelection={this.handleRowSelection}
				/>
				<div style={{ width: "50%", margin: "auto" }}>
					<Pagination
						total={this.state.total}
						current={this.state.current}
						display={this.state.display}
						onChange={number => this.handlePageChange(number)}
					/>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		posts: getAllPosts(state),
		error: getError(state),
		isLoading: getIsLoading(state)
	};
};

const mapDispatchToProps = dispatch => {
	return {
		fetchPosts: () => dispatch(postActions.getAll())
	};
};

EditorPostList = connect(mapStateToProps, mapDispatchToProps)(EditorPostList);

export default EditorPostList;
