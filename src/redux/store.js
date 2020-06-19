import { createStore, combineReducers } from "redux";
import userReducer from "./user/userReducer";
import searchReducer from "./search/searchReducer";

const saveToLocalStorage = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    }
    catch(e) {
        console.log(e);
    }
}

const loadFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) return undefined;
        const jsonState = JSON.parse(serializedState)
        jsonState.search.modal = false;
        jsonState.log.undoData = [];
        return jsonState;
    }
    catch(e) {
        console.log(e);
        return undefined;
    }
}

const rootReducer = combineReducers({log: userReducer, search: searchReducer});
const persistedState = loadFromLocalStorage();
const store = createStore(rootReducer, persistedState);

store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;