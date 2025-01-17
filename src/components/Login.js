import React, { useState } from "react";
import logo from '../images/fb.jpg';
import { useDispatch } from "react-redux";
import { logIn, uploadImage } from "../redux";
import { fetchUser } from "./service";

function Login () {
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
                            dispatch(uploadImage(response[0].img.data));
                            dispatch(logIn({userName: user, postsByUser: response[0].posts}));
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