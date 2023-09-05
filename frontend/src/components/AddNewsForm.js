import React, { useState } from 'react';
import axios from 'axios';
import { setNews, addNews, updateNews, removeNews, selectNews } from '../redux/newsSlice';
import { show, hide } from '../redux/addPopupSlice';
import { useSelector, useDispatch } from 'react-redux';

const AddNewsForm = (props) => {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const dispatch = useDispatch();

	const handleAddNews = async (e) => {
		e.preventDefault();
		try {
			const newsPostData = { 
				"title": title, 
				"content": content, 
				"userId": props.userId,
				"username": props.username
			}
			await axios.post('https://news-management-api.vercel.app/api/news', newsPostData).then(res => {
				dispatch(addNews(newsPostData))
				dispatch(hide())
                alert("Post success!");
			}).catch(err => {
				alert(err.response.data);
			});
		} catch (error) {
			console.error("Error adding news: ", error);
		}
	};

	return (
		<form className='add-form'>
			<p>Title</p>
			<textarea className='popup-input popup-input-title' placeholder='Title' onChange={(event) => { setTitle(event.target.value) }}></textarea>
			<p>Content</p>
			<textarea className='popup-input popup-input-content' placeholder='Content' onChange={(event) => { setContent(event.target.value) }}></textarea>
			<p>Author: {props.username}</p>
			<button className="add-news-button" onClick={handleAddNews}>Post</button>
		</form>
	)
};

export default AddNewsForm;
