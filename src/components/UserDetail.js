import React from "react";
import userImage from "../images/user.png";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../redux";

function UserDetail () {
    const user = useSelector(state => state.log.user);
    const dispatch = useDispatch();
    const handleSubmit = () => {
        dispatch(logOut());
        window.location.reload("/");
    }
    return (
        <div className="top-right">
            <a className="user" href="/profile">
                <img src={userImage} id="userimage" alt="userimage" />
                <span id="username">{user}</span>
            </a>
            <div className="icons">
                <button className="btn"><i className="fa fa-plus"></i></button>
                <button className="btn"><i className="fa fa-whatsapp"></i></button>
                <button className="btn"><i className="fa fa-bell"></i></button>
                <button className="btn" id="logout-button" onClick={handleSubmit}><i className="fa fa-close"></i></button>
            </div>
        </div>
    );
}

export default UserDetail;