import React from "react";
// import userJPG from "../images/user.png";

function EachStory (props) {
    const handleClick = () => {
        props.setCurrent(props.ctr);
        props.setModal(true);
    }
    return (
        <div className="entire" onClick={handleClick}>
            <img src={props.storyImg} className="image" alt="storyimage" />
            <div className="author">
                <img src={require("../images/user.png").default} className="user" alt="userimage" />
            </div>
            <div className="author2"><span><strong>{props.userPosted}</strong></span></div>
        </div>
    );
}

export default EachStory;