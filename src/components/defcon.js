import React from 'react';

class DEFCON extends React.Component {
    render() {
        let bgcs = ['red', 'orange', 'yellow', 'green'];

        let style = {
            color: this.props.level === 3 ? 'black' : 'white',
            'backgroundColor': bgcs[this.props.level - 1],
            width: '620px',
            margin: '6px',
            textAlign: 'center'
        };

        return (
            <div style={style}>
                <h2>
                    {'DEFCON THREAT LEVEL: ' + this.props.level}
                </h2>
            </div>
        );
    }
}

DEFCON.propTypes = {
    level: React.PropTypes.number.isRequired
};

export default DEFCON;