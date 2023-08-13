import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"


function Login() {

    const history = useNavigate();

    const [username,setUsername]=useState('')
    const [password,setPassword]=useState('')

    async function submit(e){
        e.preventDefault();

        try{
            await axios.post("http://localhost:3000/login", {
                "username": username, 
                "password": password
            })
            .then(res => {
                alert(res.data);
                history("/home", {state:{id:username}});
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
            <h1>News Management</h1>
            <form action="POST">
                <h1>Username</h1>
                <input className='login-input' type="username" onChange={(event) => { setUsername(event.target.value) }} placeholder="Username"  />
                <h1>Password</h1>
                <input className='login-input' type="password" onChange={(event) => { setPassword(event.target.value) }} placeholder="Password"  />
                <input className='login-submit' type="submit" onClick={submit} value={'Login'}/>
            </form>
        </div>
    )
}

export default Login;