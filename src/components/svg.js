import React from 'react';

var SVG = React.createClass({
	render() {
		let viewbox = [-300, -300, 600, 600].join(' ');
		//[ -(this.props.size / 2), -(this.props.size / 2), this.props.size, this.props.size].join(' ');

		return (
			<svg xmlns="http://www.w3.org/2000/svg" 
			 viewBox={viewbox} 
			 width={this.props.size} 
			 height={this.props.size}>
				<circle r="292.3"/>
			    <circle r="50"/>
				<path d="M75,0A75,75 0 0,0 37.5-64.951905L125-216.50635A250,250 0 0,1 250,0Z" fill="yellow"  />
				<path d="M75,0A75,75 0 0,0 37.5-64.951905L125-216.50635A250,250 0 0,1 250,0Z" fill="yellow" transform="rotate(120)" />
				<path d="M75,0A75,75 0 0,0 37.5-64.951905L125-216.50635A250,250 0 0,1 250,0Z" fill="yellow" transform="rotate(240)" />							
			</svg>
		);
	}
});

module.exports = SVG;
