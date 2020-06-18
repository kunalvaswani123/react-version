import { LOG_IN, LOG_OUT, IMAGE } from "./userTypes";

const initialState = {
    user: '',
    imgData: ''
}

const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOG_IN: return {
            ...state,
            user: action.user
        }
        case LOG_OUT: return {
            ...state,
            user: ''
        }
        case IMAGE: return {
            ...state, 
            imgData: action.data
        }
        default: return state;
    }
}

export default userReducer;