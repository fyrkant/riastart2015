// A simple component to list the event log on the main battle page. No callbacks.
// Used by Home.

import React, {PropTypes} from 'react';

class Log extends React.Component {
    render() {
        var list = this.props.log.map((txt, n) => {
            return <li key={n}>{txt}</li>;
        });

        return <ul>{list}</ul>;
    }
}

Log.propTypes = {
    log: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default Log;
