import React from "react";

function SinglePost (props) {
    return (
        <div className="post" style={{height: props.imgData.height}}>
            <div className="user">
                <img src={require("../images/user.png")} className="image" alt="userimage"/>
                <ul id="name">
                    <li><strong>{props.user}</strong></li>
                    <li id="time">2 mins</li>
                </ul>
            </div>
            <div className="vals">
                <span>
                    {props.content}
                </span>
            </div>
            <div className="post-image">
                {props.imgData.img !== null && <img src={props.imgData.img} alt="postimage"/>}
            </div>
        </div>
    );
}

export default SinglePost;