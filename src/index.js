import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';
import './index.css';

import {Router, hashHistory} from 'react-router';

import injectTapEventPlugin from 'react-tap-event-plugin';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

ReactDOM.render(
    <Router history={hashHistory} routes={Routes}/>,
  document.getElementById('root')
);
