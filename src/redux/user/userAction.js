import { LOG_IN, LOG_OUT, IMAGE, ADDIMAGE, UNDO, CLEARUNDO } from "./userTypes";

export const logIn = (userName) => {
    return {
        type: LOG_IN,
        user: userName
    }
}

export const logOut = () => {
    return {
        type: LOG_OUT
    }
}

export const image = (data) => {
    return {
        type: IMAGE,
        data: data
    }
}

export const addImage = (data) => {
    return {
        type: ADDIMAGE,
        data: data
    }
}

export const undo = () => {
    return {
        type: UNDO
    }
}

export const clearUndo = () => {
    return {
        type: CLEARUNDO
    }
}
