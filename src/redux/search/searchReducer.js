import { SEARCH, RECENT, MODAL } from "./searchTypes";

const initialState = {
    query: '',
    recent: ['', ''],
    modal: false
}

const searchReducer = (state = initialState, action) => {
    switch(action.type) {
        case SEARCH: return {
            ...state,
            query: action.query
        }
        case RECENT: return {
            ...state,
            recent: action.query
        }
        case MODAL: return {
            ...state,
            modal: !state.modal
        }
        default: return state;
    }
}

export default searchReducer;