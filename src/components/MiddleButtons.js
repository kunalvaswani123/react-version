import React from "react";

function MiddleButtons () {
    return (
        <div className="middle-buttons">
			<div className="container" id="active">
				<button className="btn"><i className="fa fa-home"></i></button>
			</div>
			<div className="container">
				<button className="btn"><i className="fa fa-bars"></i></button>
			</div>
			<div className="container">
				<button className="btn"><i className="fa fa-trash"></i></button>
			</div>
			<div className="container">
				<button className="btn"><i className="fa fa-close"></i></button>
			</div>
			<div className="container" id="last">
				<button className="btn"><i className="fa fa-folder"></i></button>
			</div>
		</div>
    );
}

export default MiddleButtons;