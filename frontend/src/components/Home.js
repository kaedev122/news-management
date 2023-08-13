import React from "react";
import {useLocation, useNavigate} from 'react-router-dom';
import NewsList from "./NewsList";

function Home() {
    const location = useLocation();
    console.log(location.state.id)
    return (
        <div className="container">
            <div className="header">
                <div className="navbar">
                    <i className="navbar-logo ti-layout-media-center-alt"></i>
                    <p className="login-info">Login as {location.state.id}</p>
                    <i className="login-info ti-user"></i>
                </div>
            </div>
            <div className="homepage">
                <h1>NEWS MANAGEMENT</h1>
                <NewsList/>
            </div>
        </div>
    )
};

export default Home;