/*
This is the entry point for the app! From here we merely import our routes definitions,
then use React and React-DOM to render it.
*/

import React from 'react';
import ReactDOM from 'react-dom';
import {Router} from 'react-router';
import {Provider} from 'react-redux';
import store from './store';
import routes from './routes';

//require('../css/styles.css');

ReactDOM.render(
	<Provider store={store}>
		<Router routes={routes}/>
	</Provider>,
	document.getElementById('root')
);
