import React, { useState } from "react";
import logo from '../images/fb.jpg';
import { useSelector, useDispatch } from "react-redux";
import { logIn, image } from "../redux";
import { fetchUser } from "./service";

function Login () {
    const state = useSelector(state => state);
    const dispatch = useDispatch();
    const [user, setUser] = useState('');
    const handleSubmit = () => {
        let postUrl = "http://localhost:8000/addUser/?update=no&user=" + user;
        const postObject = {
            method: 'POST',
            body: null
        };
        fetch(postUrl, postObject)
            .then(function(response) {
                if (response.ok) {
                    fetchUser(user)
                        .then(function(response) {
                            dispatch(image(response[0].img.data));
                            dispatch(logIn(user));
                            window.location.replace("/");
                        })
                        .catch(function(error) {
                            console.log(error);
                        })
                }
            })
            .catch(function(error) {
                console.log(error);
            }); 
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