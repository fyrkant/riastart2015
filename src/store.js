/*
This file defines the main Redux Store. It will be required by all 'smart' components in the app,
in our case Home and Hero.
*/

import {createStore, combineReducers, applyMiddleware} from 'redux';
import heroReducer from './reducers/heroes';
import battlefieldReducer from './reducers/battlefield';
import initialState from './initialstate';
import thunk from 'redux-thunk'; // allows us to use asynchronous actions


let rootReducer = combineReducers({
    heroes: heroReducer,   // this means heroReducer will operate on appState.heroes
    battlefield: battlefieldReducer // battlefieldReducer will operate on appState.battlefield,
});

export default applyMiddleware(thunk)(createStore)(rootReducer,initialState());
