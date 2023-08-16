import React, { useEffect, useState } from "react";
import {useLocation, useNavigate} from 'react-router-dom';
import NewsList from "./NewsList";
import AddNewsForm from "./AddNewsForm";
import AddUserForm from "./AddUserForm";

function Home() {
    const location = useLocation();
    const history = useNavigate();

    const [addUserPopup, setAddUserPopup] = useState(false);
    const [addNewsPopup, setAddNewsPopup] = useState(false);
    const [roleAdmin, setRoleAdmin] = useState(location.state.roleAdmin);

    return (
        <div className="container">
            <div className="header">
                <div className="navbar">
                    { roleAdmin ? (
                        <div className="add-user-button" onClick={() => setAddUserPopup(true)}>
                            <i className="ti-plus"></i>
                            <p>Add user</p>
                        </div>) : ''
                    }
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
            <div className="add-news-button" onClick={() => setAddNewsPopup(true)}>
                <i className="add-button ti-plus"></i>
            </div>
            { addNewsPopup ? (
                <div className="add-news-form-popup">
                    <div className="close-popup" onClick={() => setAddNewsPopup(false)}>
                        <i className="ti-close"></i>
                    </div>
                    <AddNewsForm userId={location.state.userId} username={location.state.username}/>
                </div>
			) : ''}
            { addUserPopup ? (
                <div className="add-news-form-popup">
                    <div className="close-popup" onClick={() => setAddUserPopup(false)}>
                        <i className="ti-close"></i>
                    </div>
                    <AddUserForm/>
                </div>
            ) : ''}
        </div>
    )
};

export default Home;