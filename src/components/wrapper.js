/*
This is our top-level component. Sub-components matching specific routes will be
contained in `this.props.children` and rendered out.
*/

import React from 'react';

export class Wrapper extends React.Component {
    render() {
        return (
            <div className="wrapper">
                <h2>Superhero battle arena 3000 - the Nukening!</h2>
                {this.props.children}
            </div>
        );
    }
}
