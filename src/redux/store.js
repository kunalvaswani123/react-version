import { createStore, combineReducers, applyMiddleware } from "redux";
import userReducer from "./user/userReducer";
import searchReducer from "./search/searchReducer";
import { UPLOADIMAGE, CHANGELIKE } from "./user/userTypes"; 
import { addImageToUndo, clearRedo, addLikeStatusToUndo } from "./index";

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

const undoMiddleware = store => next => action => {
    const currentState = store.getState();
    switch (action.type) {
        case UPLOADIMAGE:
            store.dispatch(clearRedo());
            store.dispatch(addImageToUndo({ type: action.type, data: currentState.log.imgData }));
            break;
        case CHANGELIKE:
            store.dispatch(clearRedo());
            const inverseStatus = action.status === "Like" ? "Unlike" : "Like";
            store.dispatch(addLikeStatusToUndo({ type: action.type, id: action.id, status: inverseStatus }))
            break;
    }
    next(action);
}

const rootReducer = combineReducers({log: userReducer, search: searchReducer});
const persistedState = loadFromLocalStorage();
const store = createStore(rootReducer, persistedState, applyMiddleware(undoMiddleware));

store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;