import constants from '../constants';
import initialState from '../initialstate';

/*
A reducer is a function that takes the current state and an action, and then returns a
new state. This reducer is responsible for appState.heroes data.
See `initialstate.js` for a clear view of what it looks like!
*/

export default (state,action) => {
    let newstate = Object.assign({},state); // sloppily copying the old state here, so we never mutate it

    switch(action.type) {
    case constants.KILL_HERO:
        newstate[action.killer].kills += 1;
        return newstate;
    case constants.END_BOMB:
        newstate[action.killer].kills += 1;
        return newstate;
    case constants.TAKE_NUKE_STEP:    
        if (action.killable && action.isalive) {
            newstate[action.coward].kills += action.killable.length;
        }
    default: return state || initialState().heroes;
    }
};