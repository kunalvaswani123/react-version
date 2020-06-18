import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchUser } from "./service";

function SinglePost (props) {
    const user = useSelector(state => state.log.user);
    const imgData = useSelector(state => state.log.imgData);
    const [userImage, setUserImage] = useState('data:image/png;base64,' + imgData);
    useEffect(() => {
        if (props.user === user) {
            setUserImage('data:image/png;base64,' + imgData);
        }
    }, [imgData, props, user]);
    useEffect(() => {
        fetchUser(props.user)
            .then(function(response) {
                setUserImage('data:image/png;base64,' + response[0].img.data);
            })
            .catch(function(error) {
                console.log(error);
            });
    }, [props]);
    return (
        <div className="post" style={{height: props.imgData.height}}>
            <div className="user">
                <img src={userImage} className="image" alt="userimage"/>
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