import { LOG_IN, LOG_OUT, UPLOADIMAGE, UNDO, REDO, CLEARUNDO, CLEARREDO, CHANGELIKE, ADDUNDO } from "./userTypes";
import { inverseActions } from "./userAction";

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

const handleActionInverse = (action, state) => {
    if (action.type === CHANGELIKE) {
        const postsAfterChange = handleLikeChange(action, state);
        return {
            ...state, 
            posts: postsAfterChange
        }
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
        case ADDUNDO: 
            newUndoData.push(action.prevState);
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
                const prevData = newUndoData[newUndoData.length - 1];
                newUndoData.pop();
                if (prevData.type) {
                    const newState = handleActionInverse(prevData, state);
                    newRedoData.push(inverseActions(prevData));
                    return newState;
                }
                const currentState = JSON.parse(JSON.stringify(state));
                delete currentState.undoData;
                delete currentState.redoData;
                newRedoData.push(currentState);
                let formDataToChangeImage = new FormData();
                formDataToChangeImage.append("myfile", b64toBlob(prevData.imgData), "image.png");
                postObject.body = formDataToChangeImage;
                fetch(postUrl, postObject)
                    .catch(function(error) {
                        console.log(error);
                    });
                return {
                    ...state,
                    undoData: newUndoData,
                    redoData: newRedoData,
                    imgData: prevData.imgData,
                    posts: prevData.posts
                }
            } 
            else return state;
        case REDO:
            if (newRedoData.length > 0) {
                const prevData = newRedoData[newRedoData.length - 1];
                newRedoData.pop();
                if (prevData.type) {
                    const newState = handleActionInverse(prevData, state);
                    newUndoData.push(inverseActions(prevData));
                    return newState;
                }
                const currentState = JSON.parse(JSON.stringify(state));
                delete currentState.undoData;
                delete currentState.redoData;
                newUndoData.push(currentState);
                let formDataToChangeImage = new FormData();
                formDataToChangeImage.append("myfile", b64toBlob(prevData.imgData), "image.png");
                postObject.body = formDataToChangeImage;
                fetch(postUrl, postObject)
                    .catch(function(error) {
                        console.log(error);
                    });
                return {
                    ...state,
                    undoData: newUndoData,
                    redoData: newRedoData,
                    imgData: prevData.imgData,
                    posts: prevData.posts
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