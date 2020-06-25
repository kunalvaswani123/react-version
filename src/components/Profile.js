import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPostData, fetchUser } from "./service";
import SinglePost from "./SinglePost";
import { uploadImage, undo, redo, start } from "../redux"; 

function Profile () {
    const dispatch = useDispatch();
    const postForm = useRef(null);
    const profileSrc= useRef(null);
    const resetPostForm = useRef(null);
    const fileForm = useRef(null);
    const user = useSelector(state => state.userState.userData.user);
    const imgData = useSelector(state => state.userState.userData.imgData);
    const [components, setComponents] = useState([]);
    const [userImage, setUserImage] = useState('data:image/png;base64,' + imgData);
    useEffect(() => {
        dispatch(start());
    }, [])
    useEffect(() => {
        setUserImage('data:image/png;base64,' + imgData);
    }, [imgData]);
    useEffect(() => {
        fetchPostData("", user)
            .then(function(response) {
                const tempComponents = response.map(element => {
                    let conditionalData = {
                        img: null,
                        height: '9vw'
                    };
                    if (element.img.data !== null) {
                        conditionalData.img = 'data:image/png;base64,' + element.img.data;
                        conditionalData.height = '24.7vw';
                    }
                    return (<SinglePost
                        key={element._id}
                        id={element._id}
                        user={element.name}
                        content={element.content}
                        imgData={conditionalData}
                    />);
                });
                setComponents(tempComponents);
            })
            .catch(function(error) {
                console.log(error);
            });
    }, [user]);
    const submitButton = (e) => {
        e.preventDefault();
        let postUrl = "http://localhost:8000/addUser/?update=yes&user=" + user;
        let formData = new FormData(postForm.current);
        const postObject = {
            method: 'POST',
            body: formData
        };
        if (fileForm.current.value !== "") {
            fetch(postUrl, postObject)
                .then(function(response) {
                    if (response.ok) {
                        resetPostForm.current.click();
                        fetchUser(user)
                            .then(function(response) {
                                dispatch(uploadImage(response[0].img.data));
                                setUserImage('data:image/png;base64,' + response[0].img.data);
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
    }
    const handleUndo = (e) => {
        e.preventDefault();
        dispatch(undo());
    }
    const handleRedo = (e) => {
        e.preventDefault();
        dispatch(redo());
    }
    return (
        <div>
            <div className="cover-photo">
                <img src={require("../images/post.jpg").default} className="image-in-div" alt="userimage" />
            </div>
            <div className="profile-photo">
                <img 
                    src={userImage} 
                    className="image-in-div" 
                    style={{borderRadius: '50%'}} 
                    alt="profileimage"
                    ref={profileSrc}
                />
            </div>
            <div className="user-text">
                <span>{user}</span>
            </div>
            <div className="content" style={{paddingTop: '0vw'}}>
                <form id="profilePicture" ref={postForm}>
                    <button onClick={handleUndo}><i className="fa fa-undo"></i></button>
                    <button onClick={handleRedo}><i className="fa fa-repeat"></i></button>
                    <input type="file" id="myfile" name="myfile" ref={fileForm} />
                    <input type="submit" id="submitPost" onClick={submitButton} />
                    <input type="reset" value="reset" style={{display: 'none'}} ref={resetPostForm} />
                </form>
                <div className="posts">
                    {components}
                </div>
            </div>
        </div>
    );
}

export default Profile;