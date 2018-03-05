import React, { Component } from "react";
import { connect } from "react-redux";
import * as postActions from "../actions/postActions";
import { getAllPosts } from "../reducers/posts";
import { getError, getIsLoading } from "../reducers/network";
import Pagination from "material-ui-pagination";
import PostList from "../components/guest/PostList";

class GuestPostList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			total: 0,
			display: 7,
			current: 1
		};
		this.fetchData = this.fetchData.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.handlePageChange = this.handlePageChange.bind(this);
		this.computeTotalPages = this.computeTotalPages.bind(this);
		this.getCurrentPosts = this.getCurrentPosts.bind(this);
	}
	componentDidMount() {
		this.fetchData();
	}

	componentDidUpdate() {
		window.scrollTo(0, 0);
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

	computeTotalPages(totalItems) {
		const { display } = this.state;
		const totalPages = Math.ceil(totalItems / display);

		return totalPages;
	}

	getCurrentPosts(posts) {
		const { current, display } = this.state;

		return posts.slice((current - 1) * display, current * display);
	}

	handlePageChange(current) {
		this.setState({
			current
		});
	}

	fetchData() {
		const { fetchPosts, finishLoading } = this.props;
		fetchPosts().then(finishLoading)
	}

	handleClick(postId, e) {
		console.log(postId);
		const { history } = this.props;
		history.push("/posts/" + postId);
	}

	render() {
		const { posts, error, isLoading } = this.props;
		const currentPosts = this.getCurrentPosts(posts);

		if(!posts.length && isLoading) {
			return <p>Loading...</p>
		}
		if(!posts.length && error) {
			return <p>{error}</p>
		}

		return (
			<div style={{ width: "50%", margin: "auto" }}>
				<PostList posts={currentPosts} handleClick={this.handleClick} />
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
		isLoading: getIsLoading(state),
	};
};

const mapDispatchToProps = dispatch => {
	return {
		fetchPosts: () => dispatch(postActions.getAll())
	};
};

GuestPostList = connect(mapStateToProps, mapDispatchToProps)(GuestPostList);

export default GuestPostList;
