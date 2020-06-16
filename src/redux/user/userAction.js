import { LOG_IN, LOG_OUT } from "./userTypes";

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