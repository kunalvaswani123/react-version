export const makeUndoMiddleware = (functionsRequired, actionsRequired) => {
    
    // functionsRequried is an object which should have two values:
    // 1. inverseActions is a fuction that will return the inverse of an action provided
    //    NOTE: actions should have a boolean value: inverse to indicate whether an inverse of the action exists
    // 2. handleDatabaseChange which is given the new state as a parameter and needs to change the database
    //    accordingly.

    // actionsRequired is an object which should have two values: 
    // 1. UNDO (type for UNDO action)
    // 2. REDO (type for REDO action)
    // 3. START (type for starting the architecture)
    // 4. changeState (action creator which would change the state given as parameter)

    const inverseActions = functionsRequired.inverseActions;
    const handleDatabaseChange = functionsRequired.handleDatabaseChange;

    const UNDO = actionsRequired.UNDO;
    const REDO = actionsRequired.REDO;
    const START = actionsRequired.START;
    const changeState = actionsRequired.changeState;

    // Two stacks used for maintaining latest data to undo/redo
    const architectureUndoRedo = {
        undoData: [],
        redoData: []
    }
    localStorage.setItem('architectureUndoRedo', JSON.stringify(architectureUndoRedo));

    const undoMiddleware = store => next => action => {
        let currentArchitecture = JSON.parse(localStorage.getItem('architectureUndoRedo'));
        if (action.type === START) {
            currentArchitecture.undoData = [];
            currentArchitecture.redoData = [];
        }
        else if (action.type === UNDO) {
            let undoData = currentArchitecture.undoData;
            let redoData = currentArchitecture.redoData;
            if (undoData.length > 0) {
                const prevData = undoData[undoData.length - 1];
                if (prevData.isAction) {
                    store.dispatch(prevData.action);
                    redoData.push({isAction: true, action: inverseActions(prevData.action)});
                }
                else {
                    redoData.push({isAction: false, state: store.getState()});
                    handleDatabaseChange(prevData.state)
                        .then(function(response) {
                            if (response.ok) {
                                // add anything if requried
                            }
                        })
                        .catch(function(error) {
                            console.log(error);
                        });
                    store.dispatch(changeState(prevData.state));
                }
                undoData.pop();
            }
            currentArchitecture.undoData = undoData;
            currentArchitecture.redoData = redoData;
        }
        else if (action.type === REDO) {
            let undoData = currentArchitecture.undoData;
            let redoData = currentArchitecture.redoData;
            if (redoData.length > 0) {
                const prevData = redoData[redoData.length - 1];
                if (prevData.isAction) {
                    store.dispatch(prevData.action);
                    undoData.push({isAction: true, action: inverseActions(prevData.action)});
                }
                else {
                    undoData.push({isAction: false, state: store.getState()});
                    handleDatabaseChange(prevData.state)
                        .then(function(response) {
                            if (response.ok) {
                                // add anything if requried
                            }
                        })
                        .catch(function(error) {
                            console.log(error);
                        });
                    store.dispatch(changeState(prevData.state));
                }
                redoData.pop();
            }
            currentArchitecture.undoData = undoData;
            currentArchitecture.redoData = redoData;
        }
        else {
            currentArchitecture.redoData = [];
            if (action.supportsUndo) {
                if (action.inverse)
                    currentArchitecture.undoData.push({isAction: true, action: inverseActions(action)});
                else
                    currentArchitecture.undoData.push({isAction: false, state: store.getState()});
            }
        }
        localStorage.setItem('architectureUndoRedo', JSON.stringify(currentArchitecture));
        next(action);
    }
    return undoMiddleware;
}