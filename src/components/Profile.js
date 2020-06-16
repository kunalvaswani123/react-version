import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchPostData } from "./service";
import SinglePost from "./SinglePost";

function Profile () {
    const user = useSelector(state => state.log.user);
    const [components, setComponents] = useState([]);
    useEffect(() => {
        fetchPostData("", user)
            .then(function(response) {
                const tempComponents = response.map(element => {
                    let conditionalData = {
                        img: null,
                        height: '8vw'
                    };
                    if (element.img.data !== null) {
                        conditionalData.img = 'data:image/png;base64,' + element.img.data;
                        conditionalData.height = '22vw';
                    }
                    return (<SinglePost
                        key={element._id}
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
    return (
        <div>
            <div className="cover-photo">
                <img src={require("../images/post.jpg")} className="image-in-div" alt="userimage" />
            </div>
            <div className="profile-photo">
                <img 
                    src={require("../images/user.png")} 
                    className="image-in-div" 
                    style={{borderRadius: '50%'}} 
                    alt="profileimage"
                />
            </div>
            <div className="user-text">
                <span>{user}</span>
            </div>
            <div className="content" style={{paddingTop: '0vw'}}>
                <div className="posts">
                    {components}
                </div>
            </div>
        </div>
    );
}

export default Profile;