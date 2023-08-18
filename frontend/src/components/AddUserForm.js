import React, { useState } from 'react';
import axios from 'axios';

const AddUserForm = (props) => {
	const [username, setUsername] = useState("");
	const [fullname, setFullname] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

	const handleAddUser = async (e) => {
		e.preventDefault();
		var dropdownValue = document.querySelector(".role-list").value;
		if (password == confirmPassword) {
			try {
				await axios.post('https://news-management.vercel.app/api/user', { 
					"username": username,
					"fullname": fullname,
					"password": password,
					"roleAdmin": dropdownValue
				}).then(res => {
					alert(res.data);
				}).catch(err => {
					alert(err.response.data);
				});
			} catch (error) {
				console.error("Error adding user: ", error);
			}
		} else {
			alert("Your password and confirmation password do not match!")
		}
	};

	return (
		<form className='add-form user-form'>
			<p>Username</p>
			<input className='popup-input popup-input-title' placeholder='Username' onChange={(event) => { setUsername(event.target.value) }}></input>
            <p>Fullname</p>
			<input className='popup-input popup-input-title' placeholder='Fullname' onChange={(event) => { setFullname(event.target.value) }}></input>
			<p>Password</p>
			<input type="password" className='popup-input popup-input-title' placeholder='Password' onChange={(event) => { setPassword(event.target.value) }}></input>
            <p>Confirm password</p>
			<input type="password" className='popup-input popup-input-title' placeholder='Confirm password' onChange={(event) => { setConfirmPassword(event.target.value) }}></input>
			<p>Select account role: </p>
			<select className="role-list">
				<option value="false">User</option>
				<option value="true">Admin</option>
			</select>
            <button className="add-user-button" onClick={handleAddUser}>Add new user!</button>
		</form>
	)
};

export default AddUserForm;
