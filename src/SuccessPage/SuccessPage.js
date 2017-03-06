import React from 'react';
import { hashHistory } from 'react-router';
import './SuccessPage.css';
import RaisedButton from 'material-ui/RaisedButton'



export default class SuccessPage extends React.Component{
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
				<div className="SuccessHeader">
				L'installation du device "{this.props.AppState.currentDevice.id}" 
				s'est bien déroulée</div>

				<div className="SuccessPage buttonRow">
				<RaisedButton onClick={this.handleValidation} 
				label="Faire une nouvelle installation" primary={true}/>
				</div>
				</form>
				</div>
				);
		}
	} 