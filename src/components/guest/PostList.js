import React from "react";
import {
	Card,
	CardTitle,
	CardMedia,
	List,
	ListItem,
} from "material-ui";
const PostList = ({ posts, handleClick }) => (
	<List>
		{posts.map((post, index) => (
			<ListItem key={index} onClick={e => handleClick(post.id, e)}>
				<Card>
					<CardMedia>
						<img src={post.imageUrl} alt="" />
					</CardMedia>
					<CardTitle
						title={post.title}
						subtitle={post.leadSentence}
						showExpandableButton={false}
					/>
				</Card>
			</ListItem>
		))}
	</List>
);

export default PostList;
