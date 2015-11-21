// This component shows a single battler in the arena. It is used by the Battlers component

var React = require("react"),
	ptypes = React.PropTypes,
	_ = require("lodash"),
	Link = require("react-router").Link,
	C = require("../constants");

var Battler = React.createClass({
	propTypes: {
		name: ptypes.string.isRequired,
		kill: ptypes.func.isRequired,
		bomb: ptypes.func.isRequired,		
		nuke: ptypes.func.isRequired,
		duck: ptypes.func.isRequired
	},
	render: function(){
		var p = this.props,
			name = p.name,
			doing = p.doing,
			// list all enemies that aren't dead yet
			killable = _.reduce(doing,function(list,status,opp){
				return status !== C.DEAD && opp !== name ? list.concat(opp) : list;
			},[]),
			// make buttons for all killable enemies
			buttons = killable.map(function(opp){
				return 	<div>
							<button key={opp} onClick={p.kill.bind(this,opp)}>{"Shoot "+opp}</button>
							<button key={opp + "_bomb"} onClick={p.bomb.bind(this, opp)}>{"Bomb "+opp}</button>
						</div>;
			},this).concat(
			<div>
				<button key="duck" onClick={p.duck}>duck</button>
				<button key="nuke" onClick={p.nuke.bind(this, killable)}>nuke</button>
			</div>
			); // ...as well as a duck and nuke buttons
		//controls depend on what we're doing
		var controls = { // using ES6 syntax for dynamic object properties
			[C.WAITING]: buttons.length > 1 ? buttons : "Winner!!",
			[C.DUCKING]: "ducking",
			[C.BOMBING]: "sending bombs...",
			[C.UNLOCKING_KEYPAD]: "unlocking keypad...",
			[C.ENTERING_LAUNCH_CODES]: "entering code...",
			[C.ENDS_THE_WORLD]: "says his goodbyes...",
			[C.DEAD]: "...dead...",
			[C.AIMING]: "aiming!"
		}[p.doing[name]];
		return <div className="battler" >
			<Link to={"/hero/"+name}>{name}</Link>
			<div>{controls}</div>
		</div>;
	}
});

module.exports = Battler;
