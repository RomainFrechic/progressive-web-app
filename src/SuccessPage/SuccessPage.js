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
				<div className="SuccessPage">
				<form>
				<div className="SuccessHeader">
				<span>L'installation du device <b>"{this.props.AppState.currentDevice.id}" </b> 
				s'est bien déroulée</span></div>

				<div className="SuccessPage buttonRow">
				<RaisedButton onClick={this.handleValidation} 
				label="Faire une nouvelle installation" primary={true}/>
				</div>
				</form>
				</div>
				);
		}
	} 