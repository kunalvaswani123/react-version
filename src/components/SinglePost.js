import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser } from "./service";
import { changeLike } from "../redux"; 

function SinglePost (props) {
    const user = useSelector(state => state.log.user);
    const posts = useSelector(state => state.log.posts);
    const postsToCheckChange = useSelector(state => JSON.stringify(state.log.posts));
    const dispatch = useDispatch();
    const [mountRef, setMountRef] = useState(false);
    const imgData = useSelector(state => state.log.imgData);
    const [userImage, setUserImage] = useState('data:image/png;base64,' + imgData);
    const [like, setLike] = useState({value: "Like", color: "white"});
    const [changePostsState, setChangePostsChange] = useState(false);

    /* For applying only after initial information about Like is fetched */
    const useDidUpdateEffect = (whatToDo, values) => {
        useEffect(() => {
            if (mountRef)
                whatToDo();
        }, values);
    }

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
        fetch("http://localhost:8000/checkLike/?id=" + props.id + "&user=" + user)
            .then(function(response) {
                if (response.ok) return response.json();
            })
            .then(function (data) {
                if (data.length) {
                    setLike({value: "Unlike", color: "blue"});
                }
                setMountRef(true);
            })
            .catch(function(error) {
                console.log(error);
            });
    }, [props]);
    
    useDidUpdateEffect(() => {
        const indexOfId = posts.indexOf(props.id);
        const updatedStatus = indexOfId === -1 ? "Like" : "Unlike";
        const updatedColor = indexOfId === -1 ? "white" : "blue";
        setLike({value: updatedStatus, color: updatedColor});
        fetch("http://localhost:8000/changeLike/?id=" + props.id + "&user=" + user + "&status=" + updatedStatus, {
                method: 'POST'
            })
            .catch(function(error) {
                console.log(error);
            });
    }, [postsToCheckChange]);

    useDidUpdateEffect(() => {
        if (changePostsState == true) {
            dispatch(changeLike({ status: like.value, id: props.id }));
            setChangePostsChange(false);
        }
    }, [like, changePostsState]);

    const handleLike = () => {
        if (like.value === "Like")
            setLike({value: "Unlike", color: "blue"});
        else 
            setLike({value: "Like", color: "white"});
        setChangePostsChange(true);
    }
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
            <button onClick={handleLike} className="like-button" style={{color: like.color}}>{like.value}</button>
        </div>
    );
}

export default SinglePost;