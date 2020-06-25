import { LOG_IN, LOG_OUT, UPLOADIMAGE, CHANGELIKE, CHANGESTATE } from "./userTypes";

const initialState = {
    userData: {
        user: '',
        imgData: '',
        posts: []
    }
}

const handleLikeChange = (action, state) => {
    fetch("http://localhost:8000/changeLike/?id=" + action.id + "&user=" + state.userData.user + "&status=" + action.status, {
            method: 'POST'
        })
        .catch(function(error) {
            console.log(error);
        });
    let newPosts = state.userData.posts;
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
    switch(action.type) {
        case LOG_IN: return {
            ...state,
            userData: {
                ...state.userData,
                user: action.user,
                posts: action.posts
            }
        }
        case LOG_OUT: return {
            ...state,
            userData: {
                ...state.userData,
                user: '',
                posts: []
            }
        }
        case UPLOADIMAGE: return {
            ...state, 
            userData: {
                ...state.userData,
                imgData: action.data
            }
        }
        case CHANGESTATE: 
            return action.state.userState;
        case CHANGELIKE:
            const postsAfterChange = handleLikeChange(action, state);
            return {
                ...state,
                userData: {
                    ...state.userData,
                    posts: postsAfterChange
                }
            }
        default: return state;
    }
}

export default userReducer;