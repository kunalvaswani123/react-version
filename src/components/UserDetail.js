import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../redux";
import { Link } from "react-router-dom";

function UserDetail () {
    const user = useSelector(state => state.userState.userData.user);
    const imgData = useSelector(state => state.userState.userData.imgData);
    const dispatch = useDispatch();
    const handleSubmit = () => {
        dispatch(logOut());
        window.location.reload("/");
    }
    const userImage = 'data:image/png;base64,' + imgData;
    return (
        <div className="top-right">
            <Link className="user" to="/profile">
                <img src={userImage} id="userimage" alt="userimage" />
                <span id="username">{user}</span>
            </Link>
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