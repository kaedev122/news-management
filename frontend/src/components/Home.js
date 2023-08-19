import React, { useState } from "react";
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

    const done = () => {
        console.log('===============================================')
    }

    return (
        <div className="container">
            <div className="header">
                <div className="navbar">
                    <div className="navbar-item navbar-logo">
                        <i className="ti-layout-media-center-alt"></i>
                    </div>
                    <div className="navbar-item navbar-login-info">
                        <i className="ti-user"></i>
                        <p className="">Login as {location.state.username}</p>
                    </div>
                    <div className="navbar-item navbar-button">
                        { roleAdmin ? (
                            <div className="navbar-item navbar-add-user-button" onClick={() => setAddUserPopup(true)}>
                                <i className="ti-plus"></i>
                                <p>Add user</p>
                            </div>) : ''
                        }
                        <div className="navbar-item navbar-logout">
                            <p>Logout</p>
                            <i className="ti-shift-left" onClick={() => history("/login")}></i>
                        </div>
                    </div>
                </div>
            </div>
            {/* ///////////////////////////////////////////////////////////////////////////////////////////////// */}
            <div className="homepage">
                <h1>NEWS MANAGEMENT</h1>
                <NewsList userId={location.state.userId} username={location.state.username} />
            </div>
            <div className="add-news-button" onClick={() => setAddNewsPopup(true)}>
                <i className="add-button ti-plus"></i>
            </div>
            { addNewsPopup ? (
                <div className="add-form-popup">
                    <div className="close-popup" onClick={() => setAddNewsPopup(false)}>
                        <i className="ti-close"></i>
                    </div>
                    <AddNewsForm userId={location.state.userId} username={location.state.username} done_action={done}/>
                </div>
			) : ''}
            { addUserPopup ? (
                <div className="add-form-popup user-form-popup">
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