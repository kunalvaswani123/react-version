import React from "react";
import Story from "./Story";
import Posts from "./Posts";
import StatusBar from "./StatusBar";

function Content () {
    return (
        <div className="content">
            <Story />
            <StatusBar />
            <Posts />
        </div>
    );
}

export default Content;