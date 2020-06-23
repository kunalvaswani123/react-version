import { LOG_IN, LOG_OUT, UPLOADIMAGE, ADDIMAGE, UNDO, REDO, CLEARUNDO, CLEARREDO, CHANGELIKE, ADDLIKE } from "./userTypes";

const initialState = {
    user: '',
    imgData: '',
    posts: [],
    undoData: [],
    redoData: []
}

function b64toBlob(b64) {
    var byteString = atob(b64);
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: 'image/png' });
}

const handleLikeChange = (action, state) => {
    fetch("http://localhost:8000/changeLike/?id=" + action.id + "&user=" + state.user + "&status=" + action.status, {
            method: 'POST'
        })
        .catch(function(error) {
            console.log(error);
        });
    let newPosts = state.posts;
    switch(action.status) {
        case "Unlike":
            newPosts.push(action.id);
            return newPosts;
        case "Like":
            const indexOfId = newPosts.indexOf(action.id);
            newPosts.splice(indexOfId, 1);
            return newPosts;
        default: return newPosts;    
    }
}

const userReducer = (state = initialState, action) => {
    let newUndoData = state.undoData;
    let newRedoData = state.redoData;
    let postUrl = "http://localhost:8000/addUser/?update=yes&user=" + state.user;
    const postObject = {
        method: 'POST',
        body: null
    };
    switch(action.type) {
        case LOG_IN: return {
            ...state,
            user: action.user,
            posts: action.posts
        }
        case LOG_OUT: return {
            ...state,
            user: '',
            posts: []
        }
        case UPLOADIMAGE: return {
            ...state, 
            imgData: action.data
        }
        case ADDIMAGE:
            newUndoData.push({type: action.info.type, data: action.info.data})
            return {
                ...state,
                undoData: newUndoData
            }
        case ADDLIKE:
            newUndoData.push({type: action.info.type, id: action.info.id, status: action.info.status})
            return {
                ...state,
                undoData: newUndoData
            }
        case CHANGELIKE:
            const postsAfterChange = handleLikeChange(action, state);
            return {
                ...state,
                posts: postsAfterChange
            }
        case UNDO:
            if (newUndoData.length > 0) {
                const lastData = newUndoData[newUndoData.length - 1];
                newUndoData.pop();
                switch(lastData.type) {
                    case UPLOADIMAGE: 
                        let formData = new FormData();
                        formData.append("myfile", b64toBlob(lastData.data), "image.png");
                        postObject.body = formData;
                        fetch(postUrl, postObject)
                            .catch(function(error) {
                                console.log(error);
                            });
                        newRedoData.push({ type: UPLOADIMAGE, data: state.imgData });
                        return {
                            ...state,
                            undoData: newUndoData,
                            redoData: newRedoData,
                            imgData: lastData.data
                        }
                    case CHANGELIKE: 
                        const postsAfterChange = handleLikeChange(lastData, state);
                        const inverseStatus = lastData.status === "Like" ? "Unlike" : "Like";
                        newRedoData.push({ type: lastData.type, id: lastData.id, status: inverseStatus });
                        return {
                            ...state,
                            undoData: newUndoData,
                            redoData: newRedoData,
                            posts: postsAfterChange
                        }
                }
            } 
            else return state;
        case REDO:
            if (newRedoData.length > 0) {
                const lastData = newRedoData[newRedoData.length - 1];
                newRedoData.pop();
                switch(lastData.type) {
                    case UPLOADIMAGE: 
                        let formData = new FormData();
                        formData.append("myfile", b64toBlob(lastData.data), "image.png");
                        postObject.body = formData;
                        fetch(postUrl, postObject)
                            .catch(function(error) {
                                console.log(error);
                            });
                        newUndoData.push({ type: UPLOADIMAGE, data: state.imgData });
                        return {
                            ...state,
                            undoData: newUndoData,
                            redoData: newRedoData,
                            imgData: lastData.data
                        }
                    case CHANGELIKE: 
                        const postsAfterChange = handleLikeChange(lastData, state);
                        const inverseStatus = lastData.status === "Like" ? "Unlike" : "Like";
                        newUndoData.push({ type: lastData.type, id: lastData.id, status: inverseStatus });
                        return {
                            ...state,
                            undoData: newUndoData,
                            redoData: newRedoData,
                            posts: postsAfterChange
                        }
                }
            }
            else return state;
        case CLEARUNDO: return {
            ...state,
            undoData: []
        }
        case CLEARREDO: return {
            ...state,
            redoData: []
        }
        default: return state;
    }
}

export default userReducer;