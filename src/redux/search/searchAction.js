import { SEARCH, RECENT, MODAL } from "./searchTypes";

export const search = (text) => {
    return {
        type: SEARCH,
        query: text
    }
}

export const recent = (arr) => {
    return {
        type: RECENT,
        query: arr
    }
}

export const modal = () => {
    return {
        type: MODAL
    }
}