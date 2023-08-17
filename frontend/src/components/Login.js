import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {

    const history = useNavigate();

    const [username,setUsername]=useState('')
    const [password,setPassword]=useState('')

    async function submit(e){
        e.preventDefault();

        try{
            await axios.post("http://localhost:3001/login", {
                "username": username, 
                "password": password
            })
            .then(res => {
                history("/home", { state: {userId:res.data._id, username:res.data.username, roleAdmin:res.data.roleAdmin} });
            })
            .catch(err => {
                alert(err.response.data);
            })
        }
        catch(e){
            console.log(e);
        }
    }

    return (
        <div className="login-form">
            <h1>News Management Login</h1>
            <div className="login-form-input">
                <form action="POST">
                    <h2>Username</h2>
                    <input className='login-input' type="username" onChange={(event) => { setUsername(event.target.value) }} placeholder="Username"  />
                    <h2>Password</h2>
                    <input className='login-input' type="password" onChange={(event) => { setPassword(event.target.value) }} placeholder="Password"  />
                    <button className='login-submit' type="submit" onClick={submit}>LOGIN</button>
                </form>
            </div>
        </div>
    )
}

export default Login;