import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import actions from '../actions';
import Log from './log';
import Battlers from './battlers';
import DEFCON from './defcon';

class Home extends React.Component {
    render() {
        let battleprops = this.props.battle;

        return (
            <div>
                <Battlers doing={battleprops.doing} kill={this.props.kill} bomb={this.props.bomb} duck={this.props.duck} nuke={this.props.nuke} defcon={this.props.defcon} />
                <DEFCON level={this.props.defcon} />
                <Log log={battleprops.log}/>
                {battleprops.standing === 1 || battleprops.standing === 0 ? <button onClick={this.props.reset}>Reset</button> : ''}
            </div>
        );
    }
}

Home.propTypes = {
    // redux store state, imported below
    battle: PropTypes.shape({
        doing: PropTypes.object.isRequired,
        log: PropTypes.arrayOf(PropTypes.string)
    }).isRequired,
    // redux action hookups, set up below
    bomb: PropTypes.func.isRequired,
    kill: PropTypes.func.isRequired,
    duck: PropTypes.func.isRequired,
    nuke: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
    defcon: PropTypes.number.isRequired
};

// now we connect the component to the Redux store:

let mapStateToProps = (state) => {
    // This component will have access to `state.battlefield` through `this.props.battle`
    return {
        battle: state.battlefield,
        defcon: state.battlefield.defcon
    };
};

let mapDispatchToProps = (dispatch) => {
    return {
        bomb(killer,victim) { dispatch(actions.bombAt(killer,victim)); },
        kill(killer,victim) { dispatch(actions.aimAt(killer,victim)); },
        duck(coward) { dispatch(actions.duckDown(coward)); },
        nuke(coward, killable) { dispatch(actions.nuke(coward, killable)); },
        reset() { dispatch(actions.reset()); }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
