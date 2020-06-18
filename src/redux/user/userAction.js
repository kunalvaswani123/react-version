import { LOG_IN, LOG_OUT, IMAGE } from "./userTypes";

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