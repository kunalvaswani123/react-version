import React from "react";

function UserIcon (props) {
    return (
        <div className="group">
            <img src={require("../images/user.png")} className="image" alt="userimage" />
            <div className="online"><span className="dot"></span></div>
            <span className="act">{props.userName}</span>
        </div>
    );
}

export default UserIcon;