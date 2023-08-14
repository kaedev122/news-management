import React, { useState } from 'react';
import axios from 'axios';

const AddNewsForm = (props) => {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [userId, setUserId] = useState(props.userId);
	const [username, setUsername] = useState(props.username);

	const handleAddNews = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post('http://localhost:3000/api/news', { 
				"title": title, 
				"content": content, 
				"userId": userId,
				"username": username
			}).then(res => {
				console.log(res.data)
                alert(res.data);
			}).catch(err => {
				alert(err.response.data);
			});
		} catch (error) {
			console.error("Error adding news: ", error);
		}
	};

	return (
		<form className='add-news-form'>
			<p>Title</p>
			<textarea className='popup-input popup-input-title' placeholder='Title' onChange={(event) => { setTitle(event.target.value) }}></textarea>
			<p>Content</p>
			<textarea className='popup-input popup-input-content' placeholder='Content' onChange={(event) => { setContent(event.target.value) }}></textarea>
			<p>Author: {props.username}</p>
			<button onClick={handleAddNews}>Post</button>
		</form>
	)
};

export default AddNewsForm;
