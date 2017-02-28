import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Router, hashHistory} from 'react-router';
import Routes from './Routes';

ReactDOM.render(
  <Router history={hashHistory} routes={Routes}/>,
  document.getElementById('root')
);
