// This component shows a single battler in the arena. It is used by the Battlers component
import React, {PropTypes} from 'react';
import {reduce} from 'lodash';
import {Link} from 'react-router';
import C from '../constants';

class Battler extends React.Component {
    render() {
        let p = this.props;
        let {name, doing} = p;

        // list all enemies that aren't dead yet
        let killable = reduce(doing,(list,status,opp) => {
            return status !== C.DEAD && opp !== name ? list.concat(opp) : list;
        },[]);
        // make buttons for all killable enemies
        let buttons = [];

        for (let opp of killable) {
            buttons.push(
                <div className="btn-grp" key={opp + 'btns'} >
                    <button key={opp} onClick={p.kill.bind(this, opp)}>{'Shoot ' + opp}</button>
                    <button key={opp + '_bomb'} onClick={p.bomb.bind(this, opp)}>{'Bomb ' + opp}</button>
                </div>);
        }
        buttons.push(
            // ... as well as nuke and duck
            // checks defcon level so that only one nuke can be launched at a time
            <div className="btn-grp" key={name + 'ducknuke'}>
                <button key="duck" onClick={p.duck}>duck</button>
                {p.defcon === 4 ? <button key="nuke" onClick={p.nuke.bind(this, killable)}>nuke</button> : ''}
            </div>);

        //controls depend on what we're doing
        let controls = { // using ES6 syntax for dynamic object properties
            [C.WAITING]: buttons.length === 2 ? 'Winner!' : buttons,
            [C.DUCKING]: 'ducking',
            [C.BOMBING]: 'sending bombs...',
            [C.UNLOCKING_KEYPAD]: 'unlocking keypad...',
            [C.ENTERING_LAUNCH_CODES]: 'entering code...',
            [C.ENDS_THE_WORLD]: 'says his goodbyes...',
            [C.DEAD]: '...dead...',
            [C.AIMING]: 'aiming!'
        }[p.doing[name]];

        return (
            <div className="battler" >
                <Link to={'/hero/' + name}>{name}</Link>
                <div>{controls}</div>
            </div>
        );
    }
}

Battler.propTypes = {
    name: PropTypes.string.isRequired,
    kill: PropTypes.func.isRequired,
    bomb: PropTypes.func.isRequired,
    nuke: PropTypes.func.isRequired,
    duck: PropTypes.func.isRequired
};

export default Battler;

