/*
This component renders out the list of battlers in the battlefield. It is used in the Home component.
*/

import React, {PropTypes} from 'react';
import Battler from './battler';
import {map} from 'lodash';

class Battlers extends React.Component {
    render() {
        let p = this.props;
        let boxes = map(p.doing, (doing,name) => { // loop through all heroes
            let kill = p.kill.bind(this,name); // prefill the kill method so that killer is always `name`
            let bomb = p.bomb.bind(this,name); // prefill the blast method so that killer is always `name`
            let nuke = p.nuke.bind(this, name); // prefill the name of the annihilator of worlds
            let duck = p.duck.bind(this, name); // make sure battler can only duck himself
            let defcon = p.defcon;

            return <Battler key={name} name={name} doing={p.doing} kill={kill} duck={duck} bomb={bomb} nuke={nuke} defcon={defcon} />;
        });

        return <div className="battlers">{boxes}</div>;
    }
}

Battlers.propTypes = {
    kill: PropTypes.func.isRequired,
    bomb: PropTypes.func.isRequired,
    nuke: PropTypes.func.isRequired,
    duck: PropTypes.func.isRequired,
    doing: PropTypes.object.isRequired
};

export default Battlers;