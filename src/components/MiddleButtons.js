import React from "react";
import { HomeButtonSvg, WatchButtonSvg, HutButtonSvg, PeopleButtonSvg, GridButtonSvg } from "../buttons";

function MiddleButtons () {
    return (
        <div className="middle-buttons">
			<div className="container" id="active">
                <HomeButtonSvg />
            </div>
			<div className="container">
                <WatchButtonSvg/>
			</div>
			<div className="container">
                <HutButtonSvg />
			</div>
			<div className="container">
                <PeopleButtonSvg />
			</div>
			<div className="container" id="last">
                <GridButtonSvg />
			</div>
		</div>
    );
}

export default MiddleButtons;