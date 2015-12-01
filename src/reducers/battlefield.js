import * as C from '../constants';
import initialState from '../initialstate';
import {includes, forEach} from 'lodash';

/*
A reducer is a function that takes the current state and an action, and then returns a
new state. This reducer is responsible for appState.battlefield data.
See `initialstate.js` for a clear view of what it looks like!
*/
export default (state,action) => {
    let newstate = Object.assign({},state); // sloppily copying the old state here, so we never mutate it

    switch(action.type) {
    case C.RESET:
        return initialState().battlefield;
    case C.DUCK_DOWN:
        newstate.doing[action.coward] = C.DUCKING;
        newstate.log.push(action.coward + ' ducks down like a coward.');
        return newstate;
    case C.STAND_UP:
        if (newstate.doing[action.coward] != C.DEAD) {
            newstate.doing[action.coward] = C.WAITING;
            newstate.log.push(action.coward + ' stands back up.');
        }
        return newstate;
    case C.TAKE_NUKE_STEP:
        switch(newstate.defcon) {
        case 4:
            if (newstate.doing[action.coward] !== C.DEAD) {
                newstate.defcon -= 1;
                newstate.doing[action.coward] = C.UNLOCKING_KEYPAD;
                newstate.log.push(action.coward + ' is unlocking the nuclear launch keypad...');
            }
            return newstate;
        case 3:
            newstate.defcon -= 1;
            if (newstate.doing[action.coward] !== C.DEAD) {
                newstate.doing[action.coward] = C.ENTERING_LAUNCH_CODES;
                newstate.log.push(action.coward + ' is entering the nuclear weapons launch codes...');
            } else {
                newstate.log.push(action.coward + ' died before he could enter the nuclear launch codes.');
                newstate.defcon = 4;
            }
            return newstate;
        case 2:
            newstate.defcon -= 1;
            if (newstate.doing[action.coward] !== C.DEAD) {
                newstate.doing[action.coward] = C.ENDS_THE_WORLD;
                newstate.log.push('All hope is lost. ' +
                    action.coward + ' launched an array of grade A nuclear weapons and in 5 seconds all life on this earth will be extinguished. ');
            } else {
                newstate.log.push(
                    action.coward +
                    ' died before he could press the' +
                    ' red button and launch the nuclear missiles.');
                newstate.defcon = 4;
            }
            return newstate;
        case 1:
            newstate.log.push('A white light, a crack - then silence.');
            newstate.doing[action.coward] = C.DEAD;
            forEach(action.killable,
                battler => newstate.doing[battler] = C.DEAD);
            newstate.standing = 0;
            return newstate;
        default:
            return newstate;
        }
    case C.BOMB_AT:
        newstate.doing[action.killer] = C.BOMBING;
        newstate.log.push(action.killer + ' sends bombs to ' + action.victim + '!');
        return newstate;
    case C.END_BOMB:
        if (includes([C.UNLOCKING_KEYPAD, C.ENTERING_LAUNCH_CODES], newstate.doing[action.victim])) {
            newstate.log.push(action.killer + ' averted total nuclear annihilation.');
            newstate.defcon = 4;
        }
        newstate.doing[action.victim] = C.DEAD;
        newstate.standing = newstate.standing - 1;

        if (newstate.doing[action.killer] !== C.DEAD) {
            newstate.doing[action.killer] = C.WAITING;
            newstate.log.push(action.killer + ' celebrates the death of ' + action.victim + '!');
            if (newstate.standing === 1) {
                newstate.log.push(action.killer + ' WINS!!');
            }
        } else {
            newstate.log.push(action.killer + ' died before he could celebrate the death of ' + action.victim + '.');
        }

        if (newstate.standing === 1) {
            newstate.log.push(action.killer + ' WINS!!');
        }
        return newstate;
    case C.AIM_AT:
        newstate.doing[action.killer] = C.AIMING;
        newstate.log.push(action.killer + ' takes aim at ' + action.victim + '!');
        return newstate;
    case C.KILL_HERO:
        // the shooter has died before he got the shot off
        if (state.doing[action.killer] === C.DEAD) {
            newstate.log.push('The trigger finger twitches on ' + action.killer + '\'s corpse');
        } else {
            newstate.doing[action.killer] = C.WAITING; // whatever happens we should no longer be aiming
            // the target is ducking
            if (state.doing[action.victim] === C.DUCKING) {
                newstate.log.push(action.victim + ' dodges a shot from ' + action.killer + '!');
            // the target has already been killed
            } else if (state.doing[action.victim] === C.DEAD) {
                newstate.log.push(action.killer + ' blasts ' + action.victim + '\'s corpse.');
            // we kill the target!
            } else {
                if (state.doing[action.victim] === C.AIMING) {
                    newstate.log.push(action.killer + ' killed ' + action.victim + ' before he got his shot off!');
                } else {
                    newstate.log.push(action.killer + ' killed ' + action.victim + '!');
                }

                if (includes([C.UNLOCKING_KEYPAD, C.ENTERING_LAUNCH_CODES], newstate.doing[action.victim])) {
                    newstate.log.push(action.killer + ' averted total nuclear annihilation by killing ' + action.victim);
                    newstate.defcon = 4;
                }
                newstate.doing[action.victim] = C.DEAD;
                newstate.standing = newstate.standing - 1;
                if (newstate.standing === 1) {
                    newstate.log.push(action.killer + ' WINS!!');
                }
            }
        }
        return newstate;
    default: return state || initialState().battlefield;
    }
};
