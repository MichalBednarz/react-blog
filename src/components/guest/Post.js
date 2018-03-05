import React from "react";
import {
	Card,
	CardText,
	CardTitle,
	CardMedia,
} from "material-ui";

const Post = ({ post }) => {
	if (!post) {
		return <div />;
	}
	return (
		<div style={{ width: "50%",margin: "auto", marginTop: "50px" }}>
			<Card>
				<CardMedia>
					<img src={post.imageUrl} alt="" />
				</CardMedia>
				<CardTitle
					title={post.title}
					subtitle={post.leadSentence}
					showExpandableButton={false}
				/>
				<CardText>{post.text}</CardText>
			</Card>
		</div>
	);
};

export default Post;
