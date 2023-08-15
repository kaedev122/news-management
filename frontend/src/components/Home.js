import React, { useEffect, useState } from "react";
import {useLocation, useNavigate} from 'react-router-dom';
import NewsList from "./NewsList";
import AddNewsForm from "./AddNewsForm";

function Home() {
    const location = useLocation();
    const history = useNavigate();

    const [popupActive, setPopupActive] = useState(false);
    
    return (
        <div className="container">
            <div className="header">
                <div className="navbar">
                    <i className="navbar-logo ti-layout-media-center-alt"></i>
                    <i className="login-info ti-shift-left" onClick={() => history("/login")}></i>
                    <p className="login-info">Login as {location.state.username}</p>
                    <i className="login-info ti-user"></i>
                </div>
            </div>
            <div className="homepage">
                <h1>NEWS MANAGEMENT</h1>
                <NewsList userId={location.state.userId} username={location.state.username} />
            </div>
            <div className="add-news-button" onClick={() => setPopupActive(true)}>
                <i className="add-button ti-plus"></i>
            </div>
            {popupActive ? (
                <div className="add-news-form-popup">
                    <div className="close-popup" onClick={() => setPopupActive(false)}>
                        <i className="ti-close"></i>
                    </div>
                    <AddNewsForm userId={location.state.userId} username={location.state.username}/>
                </div>
			) : ''}
        </div>
    )
};

export default Home;