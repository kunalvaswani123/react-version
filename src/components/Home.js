import React from "react";
import SearchBar from "./SearchBar";
import MiddleButtons from "./MiddleButtons";
import UserDetail from "./UserDetail";
import LeftNavigation from "./LeftNavigation";
import RightNavigation from "./RightNavigation";
import Content from "./Content";

function Home () {
    return (
        <div>
            <div className="top-navigation">
                <SearchBar />
                <MiddleButtons />
                <UserDetail />
            </div>
            <LeftNavigation />
            <RightNavigation />
            <Content />
        </div>
    );
}

export default Home;