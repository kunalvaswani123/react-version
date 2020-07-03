import React from "react";

function Shortcut (props) {
    return (
        <div className="group">
            <img src={props.imgSrc} className="image" alt="foot" />
            <span className="act">{props.act}</span>
            <span className="add">{props.add}</span>
        </div>
    );
}

export default Shortcut;