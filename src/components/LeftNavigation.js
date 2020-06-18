import React, { useState, useEffect } from "react";
import Shortcut from "./Shortcut";
import { shortcutData } from "./data/shortcuts";
import { fetchGroupData } from "./service";
import Group from "./Group";
import { useSelector } from "react-redux";

function LeftNavigation () {
    const user = useSelector(state => state.log.user);
    const imgData = useSelector(state => state.log.imgData);
    const shortcutComponents = shortcutData.map(element => <Shortcut key={element.id} act={element.act} add={element.add} />);
    const [groups, setGroups] = useState([]);
    const [loaded, setLoaded] = useState(null);
    const [styleLoader, setStyleLoader] = useState({
        up: 'none',
        down: 'block',
        load: 'none'
    });
    const userImage = 'data:image/png;base64,' + imgData;
    useEffect(() => {
        fetchGroupData(4)
            .then(function(response) {
                const components = response.map(element => <Group key={element._id} class={element.class} text={element.text} />);
                setGroups(components);
            })
            .catch(function(error) {
                console.log(error);
            });
        setLoaded(false);
    }, []);
    const handleToggle = () => {
        if (!loaded) {
            setStyleLoader({
                up: 'none',
                down: 'none',
                load: 'block'
            });
            fetchGroupData('all')
                .then(function(response) {
                    const components = response.map(element => <Group key={element._id} class={element.class} text={element.text} />);
                    setGroups(components);
                    setStyleLoader({
                        up: 'block',
                        down: 'none',
                        load: 'none'
                    });
                })
                .catch(function(error) {
                    console.log(error);
                });
            setLoaded(true);
        } 
        else {
            fetchGroupData(4)
                .then(function(response) {
                    const components = response.map(element => <Group key={element._id} class={element.class} text={element.text} />);
                    setGroups(components);
                    setStyleLoader({
                        up: 'none',
                        down: 'block',
                        load: 'none'
                    });
                })
                .catch(function(error) {
                    console.log(error);
                });
            setLoaded(false);
        }
    }
    return (
        <div className="left-navigation">
            <div className="groups">
                <div className="group">
                    <img src={userImage} id="userimage" alt="userimage" />
                    <span className="act">{user}</span>
                </div>
                <div className="list">
                    {groups}
                </div>
                <div className="group-seemore" onClick={handleToggle}>
                    <span className="act"><strong>{loaded ? 'See Less' : 'See More'}</strong></span>
                    <button className="btn">
                        <i className="fa fa-angle-up" style={{display: styleLoader.up}}></i>
                        <i className="fa fa-angle-down" style={{display: styleLoader.down}}></i>
                    </button>
                    <div className="btn-loader" style={{display: styleLoader.load}}></div>
                </div>
            </div>
            <hr />
            <div className="groups" id="shortcuts">
                <div className="headlis"><a href="#home"><strong>Shortcuts</strong></a></div>
                <div className="all-shortcuts">
                    {shortcutComponents}
                </div>
                <div className="group-seemore">
                    <span className="act"><strong>See More</strong></span>
                    <button className="btn"><i className="fa fa-angle-down"></i></button>
                </div>
            </div>
        </div>
    );
}

export default LeftNavigation;