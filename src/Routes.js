import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Signin from "./components/auth/Signin";
import Signout from "./components/auth/Signout";
import Signup from "./components/auth/Signup";
import GuestPostList from "./containers/GuestPostList";
import PostDetails from "./containers/PostDetails";
import EditorPostList from "./containers/EditorPostList";
import UpdatePost from "./components/editor/UpdatePost";
import NewPost from "./components/editor/NewPost";
import authorized from "./components/hoc/authorized";
import unauthorized from "./components/hoc/unauthorized";

const Routes = () => (
	<div>
		<Route exact path="/" component={GuestPostList} />
		<Route path="/signin" component={unauthorized(Signin)} />
		<Route path="/signup" component={unauthorized(Signup)} />
		<Route path="/signout" component={authorized(Signout)} />
		<Route exact path="/posts" component={GuestPostList} />
		<Route path="/posts/:id" component={PostDetails} />
		<Route exact path="/editor/posts" component={authorized(EditorPostList)} />
		<Route path="/editor/posts/:id/edit" component={authorized(UpdatePost)} />
		<Route path="/editor/posts/new" component={authorized(NewPost)} />
	</div>
);

export default Routes;