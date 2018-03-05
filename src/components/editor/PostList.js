import React from "react";
import { Link } from "react-router-dom";
import {
	Table,
	TableBody,
	TableRow,
	TableRowColumn,
	TableHeader,
	TableHeaderColumn,
	FloatingActionButton
} from "material-ui";
import ContentAdd from "material-ui/svg-icons/content/add";

const floatButton = {
	position: "fixed",
	zIndex: 100,
	bottom: "5%",
	right: "3%"
};

const PostList = ({ posts, handleRowSelection }) => {
	const newButton = (
		<Link to="/editor/posts/new">
			<FloatingActionButton style={floatButton} disableTouchRipple>
				<ContentAdd />
			</FloatingActionButton>
		</Link>
	);

	return (
		<div>
			{newButton}
			<Table onRowSelection={handleRowSelection}>
				<TableHeader displaySelectAll={false} adjustForCheckbox={false}>
					<TableRow>
						<TableHeaderColumn style={{ width: 50 }}>
							ID
						</TableHeaderColumn>
						<TableHeaderColumn>Name</TableHeaderColumn>
					</TableRow>
				</TableHeader>
				<TableBody displayRowCheckbox={false}>
					{posts.map((post, index) => (
						<TableRow key={post.id}>
							<TableRowColumn style={{ width: 50 }}>
								{post.id}
							</TableRowColumn>
							<TableRowColumn>{post.title}</TableRowColumn>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
};

export default PostList;
