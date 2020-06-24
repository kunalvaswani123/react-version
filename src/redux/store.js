import { createStore, combineReducers, applyMiddleware } from "redux";
import userReducer from "./user/userReducer";
import searchReducer from "./search/searchReducer";
import { UNDO, REDO, CLEARREDO, CLEARUNDO, ADDUNDO } from "./user/userTypes"; 
import { clearRedo, addToUndo, inverseActions } from "./index";

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

const actionsNotToBeAdded = [UNDO, REDO, CLEARUNDO, CLEARREDO, ADDUNDO];

const undoMiddleware = store => next => action => {
    const currentState = JSON.parse(JSON.stringify(store.getState().log));
    delete currentState.undoData;
    delete currentState.redoData;
    const canAdd = actionsNotToBeAdded.indexOf(action.type) === -1;
    if (canAdd) {
        store.dispatch(clearRedo());
        if (action.inverse)
            store.dispatch(addToUndo(inverseActions(action)));
        else
            store.dispatch(addToUndo(currentState));
    }
    next(action);
}

const rootReducer = combineReducers({log: userReducer, search: searchReducer});
const persistedState = loadFromLocalStorage();
const store = createStore(rootReducer, persistedState, applyMiddleware(undoMiddleware));

store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;