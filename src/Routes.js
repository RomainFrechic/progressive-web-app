import React from 'react';
import {Route,IndexRoute} from 'react-router';
import App from './App/App';
import NewDeviceForm from './NewDeviceForm/NewDeviceForm';
import LoggingForm from './LoggingForm/LoggingForm';
import ConfirmationPage from './ConfirmationPage/ConfirmationPage';
import SuccessPage from './SuccessPage/SuccessPage';

/* 
We chose to use hash history as url routing since browserHistory require a server configuration, see:
https://github.com/ReactTraining/react-router/blob/master/docs/guides/Histories.md
 */

const routes = (
	<Route path='/' component={App}>
		<IndexRoute component={LoggingForm}/>
		<Route path='install_device'>
			<IndexRoute component={NewDeviceForm}/>
			<Route path='confirmation'component={ConfirmationPage}/>
			<Route path='error'component={NewDeviceForm}/>
			<Route path='success'component={SuccessPage}/>
		</Route>
	</Route>
	);

export default routes;