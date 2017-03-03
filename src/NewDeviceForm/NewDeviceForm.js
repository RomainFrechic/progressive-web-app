import React from 'react';
import { hashHistory } from 'react-router';
import './NewDeviceForm.css';

export default class NewDeviceForm extends React.Component{
  constructor(props){
    super(props);
    this.state={
	
    };
  }
  componentWillMount(){
  	/*before rendering we check the logStatus and we redirect to homepage if false*/
  	this.props.userStatus.isLogged === false ? hashHistory.push('/') :null;
  }

  render(){
  	return(
		<form>
			<div className="NewDeviceForm">
				<div className="NewDeviceHeader">
					<h2>Déclarer une nouvelle installation.</h2>
				</div>

			</div>
		</form>
  		)
  }
} 