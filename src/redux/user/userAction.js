import { LOG_IN, LOG_OUT, UPLOADIMAGE, UNDO, REDO, START, CHANGELIKE, CHANGESTATE } from "./userTypes";

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

export const start = () => {
    return {
        type: START
    }
}

export const changeLike = (info) => {
    return {
        type: CHANGELIKE,
        status: info.status,
        id: info.id,
        inverse: true
    }
}

export const inverseActions = (action) => {
    if (action.type == CHANGELIKE) {
        return {
            type: CHANGELIKE,
            status: action.status === "Like" ? "Unlike" : "Like",
            id: action.id,
            inverse: true
        }
    }
}

export const changeState = (state) => {
    return {
        type: CHANGESTATE,
        state: state
    }
}