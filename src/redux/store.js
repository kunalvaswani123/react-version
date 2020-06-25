import { createStore, combineReducers, applyMiddleware } from "redux";
import userReducer from "./user/userReducer";
import searchReducer from "./search/searchReducer";
import { inverseActions, changeState } from "./index";
import { makeUndoMiddleware } from "./middlewares";
import { UNDO, REDO, START } from "./user/userTypes";
import { handleDatabaseChange } from "./service";

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
        return jsonState;
    }
    catch(e) {
        console.log(e);
        return undefined;
    }
}

const functionsRequired = {
    inverseActions: inverseActions,
    handleDatabaseChange: handleDatabaseChange
}

const actionsRequired = {
    UNDO: UNDO,
    REDO: REDO,
    START: START,
    changeState: changeState
}

const undoMiddleware = makeUndoMiddleware(functionsRequired, actionsRequired);

const rootReducer = combineReducers({userState: userReducer, search: searchReducer});
const persistedState = loadFromLocalStorage();
const store = createStore(rootReducer, persistedState, applyMiddleware(undoMiddleware));

store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;