import React from 'react';
import { hashHistory } from 'react-router';
import './ConfirmationPage.css';
import RaisedButton from 'material-ui/RaisedButton'



export default class ConfirmationPage extends React.Component{
	constructor(props){
		super(props);
		this.state={
			id:''
		};
		this.handleValidation = this.handleValidation.bind(this);
	}

		handleValidation(event){
			event.preventDefault();
			hashHistory.push('/install_device');
		}

		render(){
			return(
				<div>
				<form>
				<h3 className="ConfirmationHeader">
				L'installation du devices "{this.props.AppState.currentDevice.id}" 
				s'est bien déroulée</h3>

				<div className="ConfirmationPage buttonRow">
				<RaisedButton onClick={this.handleValidation} 
				label="Faire une nouvelle installation" primary={true}/>
				</div>
				</form>
				</div>
				);
		}
	} 