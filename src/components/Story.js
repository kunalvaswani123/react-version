import React, { useState, useEffect, useRef } from "react";
import EachStory from "./EachStory";
import { storyData } from "./data/storyData";

function Story () {
    const [current, setCurrent] = useState(6);
    const [modal, setModal] = useState(false);
    const [styleModal, setStyleModal] = useState('none');
    const modalId = useRef(null);
    let progress = useRef(null);
    const storyComponents = storyData.map(element => 
        <EachStory 
            current={current}
            setCurrent={setCurrent}
            modal={modal}
            setModal={setModal}
            key={element.id}
            ctr={element.id} 
            time={element.time} 
            storyImg={element.image} 
        />
    );
    const handleOn = (current) => {
        setStyleModal('block');
    }
    const handleOff = () => {
        setStyleModal('none');
        setModal(false);
        setCurrent(6);
    }
    useEffect(() => {
        if (modal === true && current <= 5) {
            handleOn();
            const storySrc = modalId.current.querySelectorAll(".story-image")[0];
            storySrc.src = storyData[current - 1].image;
            progress.current.classList.remove("progress-value");
            void progress.current.offsetWidth;
            progress.current.classList.add("progress-value");
            progress.current.style.animationDuration = storyData[current - 1].time + "s";
            const new_element = progress.current.cloneNode(true);
            progress.current.parentNode.replaceChild(new_element, progress.current);            
            progress.current = new_element;
            progress.current.addEventListener("animationend", () => {
                setCurrent(current + 1);
            });
        }
        else {
            handleOff();
        }
    }, [modal, current]);
    window.onclick = function(event) {
        if (event.target === modalId.current) handleOff();
    }
    return (
        <div>
           <div className="stories">
                {storyComponents}
                <div className="next">
                    <button className="btn"><i className="fa fa-arrow-right"></i></button>
                </div>
            </div>
            <div id="story-modal" style={{display: styleModal}} ref={modalId}>
                <div className="modal-body">
                    <img src={require("../images/story.jpg")} className="story-image" alt="storyimage" />
                    <img src={require("../images/user.png")} className="user-image" alt="userimage" />
                    <span className="story-username">User</span>
                    <div className="progress">
                        <div id="progress-bar" ref={progress}></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Story;