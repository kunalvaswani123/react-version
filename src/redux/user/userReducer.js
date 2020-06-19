import { LOG_IN, LOG_OUT, IMAGE, ADDIMAGE, UNDO, CLEARUNDO } from "./userTypes";

const initialState = {
    user: '',
    imgData: '',
    undoData: []
}

const userReducer = (state = initialState, action) => {
    let newUndoData = state.undoData;
    let lastImgData = state.imgData;
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
        case ADDIMAGE:
            newUndoData.push(action.data)
            return {
                ...state,
                undoData: newUndoData
            }
        case UNDO:
            if (newUndoData.length > 0) {
                lastImgData = newUndoData[newUndoData.length - 1];
                newUndoData.pop();
            } 
            return {
                ...state,
                undoData: newUndoData,
                imgData: lastImgData
            }
        case CLEARUNDO: return {
            ...state,
            undoData: []
        }
        default: return state;
    }
}

export default userReducer;