import React from "react";
import "../styles/PostForm.css";
import { Field } from "redux-form";
import { TextField } from "redux-form-material-ui";
import { RaisedButton } from "material-ui";
import MaterialIcon from "react-google-material-icons";
import Dropzone from "react-dropzone";

const renderDropzoneInput = field => {
	const imageUrl = field.imageUrl;

	const view = (imageUrl) => {
		if(!imageUrl) {
			return <MaterialIcon icon="image" size={64}/>
		} 
		return <img src={imageUrl} alt="" />
	}

	return (
		<div>
			<Dropzone
				style={{height: '100%'}}
				name={field.name}
				onDrop={(filesToUpload, e) =>
					field.input.onChange(filesToUpload)				
				}
				accept="image/*"
				multiple={false}
			>
				{view(imageUrl)}
			</Dropzone>
			{field.meta.touched &&
				field.meta.error && (
					<span className="error">{field.meta.error}</span>
				)}
		</div>
	);
};

const PostForm = props => (
	<div className="container-style">
		<form
			onSubmit={props.handleSubmit(props.submit)}
			className="form-style"
		>
			<Field
				fullWidth={true}
				name="title"
				component={TextField}
				hintText="Title"
			/>
			<Field
				fullWidth={true}
				name="leadSentence"
				component={TextField}
				hintText="Lead sentence"
			/>
			<Field
				fullWidth={true}
				name="imageUrl"
				component={renderDropzoneInput}
				onChange={props.onDrop}
				imageUrl={props.imageUrl}
			/>
			<Field
				fullWidth={true}
				name="text"
				multiLine={true}
				rows={10}
				rowsMax={100}
				component={TextField}
				hintText="Content goes here..."
			/>

			<RaisedButton label="SAVE CHANGES" primary={true} type="submit" />
		</form>
	</div>
);

export default PostForm;
