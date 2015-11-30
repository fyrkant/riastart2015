// This component shows a single battler in the arena.

import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

class Hero extends React.Component {
    render() {
        let name = this.props.params.name;
        let data = this.props.heroes[name];

        return (
        <div>
            <p><Link to="/">Back to arena</Link></p>
            <p>Here's some info on {this.props.params.name}:</p>
            <p><strong>Quote:</strong> {data.quote} </p>
            <p><strong>Kills:</strong> {data.kills} </p>
        </div>
        );
    }
}

Hero.propTypes = {
    params: PropTypes.shape({name: PropTypes.string.isRequired}).isRequired, // will be provided by react-router
    heroes: PropTypes.object.isRequired // will be provided by react-redux
};

export default Hero;

// connect to Redux store

var mapStateToProps = (state) => {
    // This component will have access to `appstate.heroes` through `this.props.heroes`
    return {heroes: state.heroes};
};

export default connect(mapStateToProps)(Hero);
