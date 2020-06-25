import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { search, modal } from "../redux";

function StatusBar () {
    const user = useSelector(state => state.userState.userData.user);
    const imgData = useSelector(state => state.userState.userData.imgData);
    const postForm = useRef(null);
    const resetPostForm = useRef(null);
    const modalId = useRef(null);
    const [styleModal, setStyleModal] = useState('none');
    const dispatch = useDispatch();
    const userImage = 'data:image/png;base64,' + imgData;
    const handleModal = () => {
        dispatch(modal());
        setStyleModal('block');
    }
    const handleClose = () => {
        dispatch(modal());
        setStyleModal('none');
    }
    const submitButton = (e) => {
        e.preventDefault();
        let postUrl = "http://localhost:8000/postData/?user=" + user;
        let formData = new FormData(postForm.current);
        const postObject = {
            method: 'POST',
            body: formData
        };
        fetch(postUrl, postObject)
            .then(function(response) {
                if (response.ok) {
                    dispatch(search("checking again"));
                    dispatch(search(""));
                }
            })
            .catch(function(error) {
                console.log(error);
            }); 
        handleClose();
        resetPostForm.current.click();
    }
    window.onclick = function(event) {
        if (event.target === modalId.current) handleClose();
    }
    return (
        <div>
            <div className="status">
                <div className="put">
                    <img src={userImage} id="userimage" alt="userimage" />
                    <input onClick={handleModal} type="text" placeholder="What's on your mind, User?" id="statusbar" />
                </div>
                <hr />
                <div className="activity">
                    <div className="btn">
                        <img src={require("../images/photo.png").default} className="image" alt="video" />
                        <span className="act"><strong>Photo/Video</strong></span> 
                    </div>
                    <div className="btn">
                        <img src={require("../images/tag.png").default} className="image" alt="tag" />
                        <span className="act"><strong>Tag Friends</strong></span>
                    </div>
                    <div className="btn">
                        <img src={require("../images/feel.png").default} className="image" alt="feel" />
                        <span className="act"><strong>Feeling/Activity</strong></span>
                    </div>
                </div>
            </div>
            <div id="status-modal" style={{display: styleModal}} ref={modalId}>
                <div className="modal-body">
                    <div className="title">
                        <strong>Create Post</strong>
                        <button id="close-modal" onClick={handleClose} ><i className="fa fa-window-close"></i></button>
                    </div>
                    <div className="text">
                        <form id="postForm" ref={postForm}>
                            <input className="text-bar" type="text" placeholder="What's on your mind, User?" name="search" />
                            <input type="file" id="myfile" name="myfile" />
                            <input type="submit" id="submitPost" onClick={submitButton} />
                            <input type="reset" value="reset" style={{display: 'none'}} ref={resetPostForm} />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StatusBar;