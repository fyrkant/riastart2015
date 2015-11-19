/*
This is the entry point for the app! From here we merely import our routes definitions,
then use React and React-DOM to render it.
*/

var React = require('react'),
	ReactDOM = require('react-dom'),
	Router = require('react-router').Router,
	Provider = require('react-redux').Provider,
	store = require('./store'),
	routes = require('./routes'),
	// React components for Redux DevTools
	DevTools = require('redux-devtools/lib/react').DevTools,
	DebugPanel = require('redux-devtools/lib/react').DebugPanel,
	LogMonitor = require('redux-devtools/lib/react').LogMonitor;

ReactDOM.render(
	// The top-level Provider is what allows us to `connect` components to the store
	// using ReactRedux.connect (see components Home and Hero)
	<div>
		<Provider store={store}>
			<Router routes={routes}/>
		</Provider>
		<DebugPanel top right bottom>
      <DevTools store={store} monitor={LogMonitor} />
    </DebugPanel>
	</div>,
	document.getElementById("root")
);
