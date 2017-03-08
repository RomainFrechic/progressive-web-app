import React from 'react';
import { hashHistory } from 'react-router';
import './ConfirmationPage.css';
import WarningIcon from 'material-ui/svg-icons/alert/warning';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton'


export default class  ConfirmationPage extends React.Component{
	constructor(props){
		super(props);
		this.state={
			waitingOnServer: false,
		};
		this.handleValidation = this.handleValidation.bind(this);
	}

	componentWillMount(){
		/*before rendering we check the logStatus and we redirect to homepage if false*/
		if(this.props.AppState.isLogged === false){hashHistory.push('/');}
	}

	handleValidation(event){
		event.preventDefault();
		this.setState({waitingOnServer:true});
		hashHistory.push('/install_device/success');
		const {postalAdress,latitude,longitude,id,timeOfInstall,comment,usedGeolocalisation} = this.props.AppState.currentDevice;
		const {userLogin, userOrganisation} = this.props.AppState;
		console.log(id,userLogin);

	/*
	
	ici send request
	 */
	}

	render(){
		return(
			<form>
			<div className="NewConfirmation">
			<div className="ConfirmationHeader">
			<h4>Merci de vérifier les champs renseignés</h4></div>

			<div className="ConfirmationRow">
			<span><b>Installateur :</b> {this.props.AppState.userLogin} </span></div>

			<div className="ConfirmationRow">
			<span><b>Date :</b> {this.props.AppState.currentDevice.timeOfInstall} </span></div>


			<div className="ConfirmationRow">
			<span><b>Adresse IDIAG :</b></span>
				 <TextField disabled={true} name="id" type='text' value={this.props.AppState.currentDevice.id} onBlur={this.testIdField} fullWidth 
				 floatingLabelText=""
				 />
			</div>


			<div className="ConfirmationRow">
			<span><b>Localisation :</b></span>
				 <TextField disabled={true} name="id" type='text' value={this.props.AppState.currentDevice.postalAdress} onBlur={this.testIdField} fullWidth 
				 floatingLabelText=""
				 />
			</div>
			<div className="ConfirmationRow">
			<span><b>Commentaire :</b></span>
			<TextField
			className="ConfirmationTextField"
			disabled={true}
			defaultValue={this.props.AppState.currentDevice.comment}
			multiLine rows={2} rowsMax={2} 
			style={{textAlign: 'left'}} fullWidth
			floatingLabelText=""
			/></div>
             <div className="messageWarning">
			<p> <WarningIcon className="iconWarning" style={{color: 'orange'}} />
			Les renseignements fournis sont modifiables 
			uniquement en effectuant la procédure d'installation
			 à nouveau</p>
			 
			</div>
			<div className="ConfirmationPage confirmButtonRow">
			<RaisedButton onClick={this.handleValidation} 
			label="Confirmer les renseignements" primary={true}/>
			</div>
			</div>
			</form>
			);
	}
} 