/*
This module contains action creators. They are functions which will return an object describing the actions.
These actions are imported by Redux-aware components who need them, in our case it is just Home.
*/

import C  from './constants';

export default {
    reset() {
        // A normal action creator, returns a simple object describing the action.
        return {
            type: C.RESET
        };
    },
    duckDown(who) {
        // here we take advantage of Redux-thunk; instead of returning an object describing an action,
        // we return a function that takes dispatch and getState as arguments. This function can then
        // invoke dispatch, now or later using setTimeout or similar.
        return (dispatch, getState) => {
            dispatch({
                type: C.DUCK_DOWN,
                coward: who
            });

            setTimeout(() => {
                dispatch({
                    type: C.STAND_UP,
                    coward: who
                });
            },2000);
        };
    },
    nuke(who, killable) {
        return (dispatch, getState) => {
            dispatch({
                type: C.TAKE_NUKE_STEP,
                coward: who
            });

            setTimeout(() => {
                dispatch({
                    type: C.TAKE_NUKE_STEP,
                    coward: who
                });

                setTimeout(() => {
                    dispatch({type: C.TAKE_NUKE_STEP,
                        coward: who
                    });

                    setTimeout(() => {
                        dispatch({
                            type: C.TAKE_NUKE_STEP,
                            coward: who,
                            killable: killable,
                            isalive: getState().battlefield.doing[who] !== C.DEAD
                        });
                    }, 5000);
                }, 3000);
            }, 4000);
        };
    },
    aimAt(killer, victim) {
        // Another async action using the Redux-thunk syntax
        return (dispatch, getState) => {
            dispatch({
                type: C.AIM_AT,
                killer: killer,
                victim: victim
            });

            setTimeout(() => {
                dispatch({
                    type: C.KILL_HERO,
                    killer: killer,
                    victim: victim
                });
            },2000);
        };
    },
    bombAt(killer, victim) {
        // Another async action using the Redux-thunk syntax
        return (dispatch,getState) => {
            dispatch({
                type: C.BOMB_AT,
                killer: killer,
                victim: victim
            });

            setTimeout(() => {
                dispatch({
                    type: C.END_BOMB,
                    killer: killer,
                    victim: victim
                });
            }, 2000);
        };
    }
};
