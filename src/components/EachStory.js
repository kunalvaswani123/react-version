import React from "react";

function EachStory (props) {
    const handleClick = () => {
        props.setCurrent(props.ctr);
        props.setModal(true);
    }
    return (
        <div className="entire" onClick={handleClick}>
            <img src={props.storyImg} className="image" alt="storyimage" />
            <div className="author">
                <img src={require("../images/user.png")} className="user" alt="userimage" />
            </div>
            <div className="author2"><span><strong>User</strong></span></div>
        </div>
    );
}

export default EachStory;