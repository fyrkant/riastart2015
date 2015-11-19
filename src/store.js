/*
This file defines the main Redux Store. It will be required by all "smart" components in the app,
in our case Home and Hero.
*/

var Redux = require("redux"),
	heroReducer = require("./reducers/heroes"),
	battlefieldReducer = require("./reducers/battlefield"),
	initialState = require("./initialstate"),
	thunk = require('redux-thunk'), // allows us to use asynchronous actions
	// Redux DevTools store enhancers
	devTools = require('redux-devtools').devTools,
	persistState = require('redux-devtools').persistState;

var rootReducer = Redux.combineReducers({
	heroes: heroReducer,   // this means heroReducer will operate on appState.heroes
	battlefield: battlefieldReducer // battlefieldReducer will operate on appState.battlefield,
});

var finaleCreateStore = Redux.compose(
	Redux.applyMiddleware(thunk),
	// Provides support for DevTools:
    devTools(),
    // Lets you write ?debug_session=<name> in address bar to persist debug sessions
    persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
)((Redux.createStore));

module.exports = finaleCreateStore(rootReducer,initialState());
