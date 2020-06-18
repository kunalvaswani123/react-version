import React, { useState, useEffect } from "react";
import logo from '../images/fb.jpg';
import { useSelector, useDispatch } from "react-redux";
import { search, recent } from "../redux";

function SearchBar () {
    const lastSearch = useSelector(state => state.search.recent);
    const modalToggle = useSelector(state => state.search.modal);
    const dispatch = useDispatch();
    const [blocks, setBlocks] = useState({
        small: 'block',
        big: 'none'
    });
    const [query, setQuery] = useState("");
    useEffect(() => {
        dispatch(search(query));
    }, [query, dispatch]);
    const handleDrop = () => {
        setBlocks({
            small: 'none',
            big: 'block'
        });
    }
    const handleUp = () => {
        setBlocks({
            small: 'block',
            big: 'none'
        });
        setQuery("");
    }
    const handleQuery = (event) => {
        setQuery(event.target.value);
    }
    const handleKeyPress = (event) => {
        if (event.key === "Enter" && query !== "") {
            if (query !== lastSearch[0])
                dispatch(recent([query, lastSearch[0]]));
        }
    }
    const handlRecentSearch = (flag) => {
        return () => {
            if (lastSearch[flag]) {
                setQuery(lastSearch[flag]);
                if (lastSearch[flag] !== lastSearch[0])
                    dispatch(recent([lastSearch[flag], lastSearch[0]]));
            }
        }
    }
    useEffect(() => {
        if (modalToggle === true) handleUp();
    }, [modalToggle]);
    return (
        <div>
            <div className="search-bar" style={{display: blocks.small}}>
                <a href="/">
                    <img src={logo} alt="fb_logo" id="fb" />
                </a>
                <div className="search">
                    <i className="fa fa-search" id="searchicon"></i>
                    <input type="text" placeholder="Search Facebook" id="searchbar" onClick={handleDrop} />
                </div>
            </div>
            <div className="full-search-bar" style={{display: blocks.big}}>
                <div className="content">
                    <button className="btn" id="exit-full" onClick={handleUp}><i className="fa fa-angle-left"></i></button>
                    <div className="search">
                        <input 
                            type="text" 
                            placeholder="Search Facebook" 
                            id="get-search" 
                            value={query} 
                            onChange={handleQuery}
                            onKeyPress={handleKeyPress}
                        />
                    </div>
                    <div className="text">
                        <span><strong>Recent Searches</strong></span>
                    </div>
                    <div className="search-text" onClick={handlRecentSearch(0)}>
                        {lastSearch && lastSearch[0]}
                    </div>
                    <div className="search-text" onClick={handlRecentSearch(1)}>
                        {lastSearch && lastSearch[1]}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchBar;