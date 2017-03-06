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

		componentWillMount(){
		/*before rendering we check the logStatus and we redirect to homepage if false*/
		if(this.props.AppState.isLogged === false){hashHistory.push('/');}
	}

		handleValidation(event){
			event.preventDefault();
			const currentDevice = this.props.AppState.currentDevice;
			const changeRoute = hashHistory.push('/install_device');

			this.props.setStateApp({currentDevice:{
			usedGeolocalisation:currentDevice.usedGeolocalisation,
		    latitude:currentDevice.latitude,
        	longitude:currentDevice.longitude,
		    postalAdress:currentDevice.postalAdress,
		    id:'',
		    timeOfInstall: '',
		    comment: ''
			}}, changeRoute);

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