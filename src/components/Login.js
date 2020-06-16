import React, { useState } from "react";
import logo from '../images/fb.jpg';
import { useDispatch } from "react-redux";
import { logIn } from "../redux";

function Login () {
    const dispatch = useDispatch();
    const [user, setUser] = useState('');
    const handleSubmit = () => {
        dispatch(logIn(user));
        window.location.replace("/");
    }
    const handleChange = (event) => {   
        setUser(event.target.value);
    }
    return (
        <div id="username-modal">
            <div className="fb-logo">
                <img src={logo} alt="fb_logo" id="fb" />
            </div>
            <div className="modal-body">
                <div className="title">
                    <strong>Enter Username</strong>
                </div>
                <div className="text">
                    <input 
                        className="text-bar" 
                        type="text" 
                        placeholder="Enter Here" 
                        name="search" 
                        value={user}
                        onChange={handleChange}
                    />
                </div>
                <div id="submitUser" onClick={handleSubmit}><strong>Submit</strong></div>
            </div>
        </div>
    );
}

export default Login;