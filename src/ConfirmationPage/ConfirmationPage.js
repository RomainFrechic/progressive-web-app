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
		hashHistory.push('/install_device/success');
	}

	render(){
		return(
			<form>
			<div className="NewConfirmation">
			<div className="ConfirmationHeader">
			<h4>Merci de vérifier les champs renseignés</h4></div>

			<div className="ConfirmationRow">
			<span><b>Installateur :</b> {this.props.AppState.userLogin}.</span></div>

			<div className="ConfirmationRow">
			<span><b>Date :</b> {this.props.AppState.currentDevice.timeOfInstall}.</span></div>

			<div className="ConfirmationRow">
			<span><b>Device id :</b> {this.props.AppState.currentDevice.id}.</span></div>

			<div className="ConfirmationRow">
			<span><b>Localisation :</b> {this.props.AppState.currentDevice.postalAdress}.</span></div>

			<div className="LongLatRow">
			<span><b>Long :</b> {this.props.AppState.currentDevice.latitude}</span>
			<span> <b>Lat :</b> {this.props.AppState.currentDevice.longitude}</span></div>


			<TextField
			className="ConfirmationTextField"
			disabled={true}
			hintText="Disabled Hint Text"
			defaultValue={this.props.AppState.currentDevice.comment}
			multiLine rows={2} rowsMax={2} 
			style={{textAlign: 'left'}} fullWidth
			floatingLabelText="Commentaire"
			/>
             <div className="messageWarning">
			<p> <WarningIcon className="iconWarning" style={{color: 'orange'}} />
			Les renseignements fournis sont modifiables 
			uniquement en effectuant la procédure d'installation
			 à nouveaux</p>
			 
			</div>
			<div className="ConfirmationPage buttonRow">
			<RaisedButton onClick={this.handleValidation} 
			label="Confirmer les renseignements" primary={true}/>
			</div>
			</div>
			</form>
			);
	}
} 