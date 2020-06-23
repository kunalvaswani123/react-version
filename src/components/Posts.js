import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchPostData } from "./service";
import SinglePost from "./SinglePost";

function Posts () {
    let query = useSelector(state => state.search.query);
    const [components, setComponents] = useState([]);
    useEffect(() => {
        fetchPostData(query, "")
            .then(function(response) {
                const tempComponents = response.map(element => {
                    let conditionalData = {
                        img: null,
                        height: '9vw'
                    };
                    if (element.img.data !== null) {
                        conditionalData.img = 'data:image/png;base64,' + element.img.data;
                        conditionalData.height = '24.7vw';
                    }
                    return (<SinglePost
                        key={element._id}
                        id={element._id}
                        user={element.name}
                        content={element.content}
                        imgData={conditionalData}
                    />);
                });
                setComponents(tempComponents);
            })
            .catch(function(error) {
                console.log(error);
            });
    }, [query]);
    return (
        <div className="posts">
            {components}
        </div>
    );
}

export default Posts;