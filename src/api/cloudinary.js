import axios from "axios";

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dd9qduy2l/image/upload"
const CLOUDINARY_KEY = "792277944668531"
const CLOUDINARY_PRESET = "w2rvivcn"

export const uploadImage = file => {
	const formData = new FormData();
	formData.append("file", file);
	formData.append("upload_preset", CLOUDINARY_PRESET); // Claudinary preset
	formData.append("api_key", CLOUDINARY_KEY); // Claudinary key
	formData.append("timestamp", (Date.now() / 1000) | 0);

	return axios
		.post(
			CLOUDINARY_URL,
			formData,
			{
				headers: { "X-Requested-With": "XMLHttpRequest" }
			}
		).then(response => response.data)
};

