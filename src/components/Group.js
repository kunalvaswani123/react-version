import React from "react";

function Group (props) {
    return (
        <div className="group">
            <button className="btn"><i className={props.class}></i></button>
            <span className="act">{props.text}</span>
        </div>
    );
}

export default Group;