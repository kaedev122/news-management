import React, { useState } from 'react';
import axios from 'axios';

const AddUserForm = (props) => {
	const [username, setUsername] = useState("");
	const [fullname, setFullname] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

	const handleAddUser = async (e) => {
		e.preventDefault();
		// try {
		// 	await axios.post('http://localhost:30/', { 
		// 		"title": title, 
		// 		"content": content, 
		// 		"userId": props.userId,
		// 		"username": props.username
		// 	}).then(res => {
        //         alert(res.data);
		// 	}).catch(err => {
		// 		alert(err.response.data);
		// 	});
		// } catch (error) {
		// 	console.error("Error adding news: ", error);
		// }
	};

	return (
		<form className='add-news-form'>
			<p>Username</p>
			<input className='popup-input popup-input-title' placeholder='Username' onChange={(event) => { setUsername(event.target.value) }}></input>
            <p>Fullname</p>
			<input className='popup-input popup-input-title' placeholder='Fullname' onChange={(event) => { setFullname(event.target.value) }}></input>
			<p>Password</p>
			<input type="password" className='popup-input popup-input-content' placeholder='Password' onChange={(event) => { setPassword(event.target.value) }}></input>
            <p>Confirm password</p>
			<input type="password" className='popup-input popup-input-content' placeholder='Confirm password' onChange={(event) => { setConfirmPassword(event.target.value) }}></input>
			<input type="radio" ></input>
            <button onClick={handleAddUser}>Post</button>
		</form>
	)
};

export default AddUserForm;
