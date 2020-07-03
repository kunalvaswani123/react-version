import React from "react";
import UserIcon from "./UserIcon";
import { userData } from "./data/userData";

function RightNavigation () {
    const userComponents = userData.map(element => <UserIcon key={element.id} userName={element.user} />);
    return (
        <div className="right-navigation">
            <div className="sponsored">
                <div className="headlis"><a href="#home"><strong>Sponsored</strong></a></div>
                <img src={require('../images/sprinklr.png').default} className="image" alt="logo" />
            </div>
            <hr />
            <div className="groups" id="bday">
                <div className="headlis"><a href="#home"><strong>Birthdays</strong></a></div>
                <div className="group">
                    <button className="btn" id="cake"><i className="fa fa-birthday-cake"></i></button>
                    <span className="act"><strong>Kunal</strong> have their birthdays today</span>
                </div>
            </div>
            <hr />
            <div className="groups" id="chat-users">
                <div className="headlis"><a href="#home"><strong>Contacts</strong></a></div>
                { userComponents }
            </div>
            <div className="messenger-icon">
                <button className="btn"><i className="fa fa-whatsapp"></i></button>
            </div>
        </div>
    );
}

export default RightNavigation;