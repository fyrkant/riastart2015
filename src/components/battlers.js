/*
This component renders out the list of battlers in the battlefield. It is used in the Home component.
*/

var React = require("react"),
	ptypes = React.PropTypes,
	Battler = require("./battler"),
	_ = require("lodash");

var Battlers = React.createClass({
	propTypes: {
		kill: ptypes.func.isRequired,
		bomb: ptypes.func.isRequired,
		nuke: ptypes.func.isRequired,
		duck: ptypes.func.isRequired,
		doing: ptypes.object.isRequired
	},
	render: function(){
		var p = this.props, boxes = _.map(p.doing,function(doing,name){ // loop through all heroes
			var kill = p.kill.bind(this,name), // prefill the kill method so that killer is always `name`
					bomb = p.bomb.bind(this,name), // prefill the blast method so that killer is always `name`
					nuke = p.nuke.bind(this, name), // prefill the name of the annihilator of worlds
					duck = p.duck.bind(this, name); // make sure battler can only duck himself
			return <Battler key={name} name={name} doing={p.doing} kill={kill} duck={duck} bomb={bomb} nuke={nuke} />;
		},this);
		return <div className="battlers">{boxes}</div>;
	}
});

module.exports = Battlers;
