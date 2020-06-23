import { LOG_IN, LOG_OUT, UPLOADIMAGE, ADDIMAGE, UNDO, REDO, CLEARUNDO, CLEARREDO, CHANGELIKE, ADDLIKE } from "./userTypes";

export const logIn = (info) => {
    return {
        type: LOG_IN,
        user: info.userName,
        posts: info.postsByUser
    }
}

export const logOut = () => {
    return {
        type: LOG_OUT
    }
}

export const uploadImage = (data) => {
    return {
        type: UPLOADIMAGE,
        data: data
    }
}

export const addImageToUndo = (info) => {
    return {
        type: ADDIMAGE,
        info: info
    }
}

export const addLikeStatusToUndo = (info) => {
    return {
        type: ADDLIKE,
        info: info
    }
}

export const undo = () => {
    return {
        type: UNDO
    }
}

export const redo = () => {
    return {
        type: REDO
    }
}

export const clearUndo = () => {
    return {
        type: CLEARUNDO
    }
}

export const clearRedo = () => {
    return {
        type: CLEARREDO
    }
}

export const changeLike = (info) => {
    return {
        type: CHANGELIKE,
        status: info.status,
        id: info.id
    }
}
