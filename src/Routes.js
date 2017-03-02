import React from 'react';
import {Route,IndexRoute} from 'react-router';
import App from './App/App';
import NewDeviceForm from './NewDeviceForm/NewDeviceForm';
import LoggingForm from './LoggingForm/LoggingForm';


const routes = (
	<Route path='/' component={App}>
		<IndexRoute component={LoggingForm}/>
		<Route path='create_device' component={NewDeviceForm}/>
	</Route>
	);

export default routes;