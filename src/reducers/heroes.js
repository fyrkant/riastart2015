var constants = require("../constants"),
	initialState = require("../initialstate");

/*
A reducer is a function that takes the current state and an action, and then returns a
new state. This reducer is responsible for appState.heroes data.
See `initialstate.js` for a clear view of what it looks like!
*/

module.exports = function(state,action){
	var newstate = Object.assign({},state); // sloppily copying the old state here, so we never mutate it
	switch(action.type){
		case constants.KILL_HERO:
			newstate[action.killer].kills += 1;
			return newstate;
		case constants.END_BOMB:
			newstate[action.killer].kills += 1;
			return newstate;
		/*case constants.TAKE_NUKE_STEP && newstate.defcon === 1:
			newstate[action.coward].kills += action.killable.length;
			return newstate;*/
		default: return state || initialState().heroes;
	}
};