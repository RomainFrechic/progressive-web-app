import React from 'react';
import axios from 'axios';
import { hashHistory } from 'react-router';
import './ConfirmationPage.css';
import CircularProgress from 'material-ui/CircularProgress';
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
		//hashHistory.push('/install_device/success');
		const {postalAdress,latitude,longitude,id,timeOfInstall,comment,usedGeolocalisation} = this.props.AppState.currentDevice;
		const {userLogin, userOrganisation} = this.props.AppState;
		/*FOR DEVELLOPMENT ONLY, once the real api will be built, replace by real url.*/
		/*For testing purpose, if we enter the id as "E403", we swap url for an api that send the requested error code*/
		const URL = id !== "E403"? `https://reqres.in/api/install`: `https://reqres.in/api/register`
		console.log(URL);
		axios.post(URL,
			{
				postalAdress,
				latitude,
				longitude,
				deviceID: id,
				timeOfInstall,
				comment,
				usedGeolocalisation,
				userLogin,
				userOrganisation
		})
		.then((response)=>{
			console.log(response);
			this.setState({waitingOnServer:false});
			if(response.status === (201)){
				/*redirect to NewDeviceForm page, keep only locatation state and clear session storage */
				window.sessionStorage.clear();
				this.props.setStateApp({
					successInstall: true,
					successInstallMessage: `L'installation de "${id}" s'est bien déroulée`,
					currentDevice:{
						usedGeolocalisation:usedGeolocalisation,
			    		latitude:latitude,
	        			longitude:longitude,
			    		postalAdress:postalAdress,
			    		id:'',
			    		timeOfInstall: '',
			    		comment: ''
			}},()=> hashHistory.push('/install_device'));
			}
		})
		.catch((error)=>{
			console.log("error",error.response.status);
			this.setState({waitingOnServer:false},()=>{
				/* replace by wich ever error code you prefer*/
				if(error.response.status === 403 || error.response.status === 400){
					console.log('in')
					this.props.setStateApp({
      					errorInstall: true,
      					errorInstallMessage: `L'adresse IDIAG ${id} n'est pas déclaré sur la plateforme.`, 
						currentDevice:{
							usedGeolocalisation:usedGeolocalisation,
				    		latitude:latitude,
		        			longitude:longitude,
				    		postalAdress:postalAdress,
				    		id:id ,
				    		timeOfInstall: '',
				    		comment: comment
						}
					},()=>hashHistory.push('/install_device'));
				}
			});

		});
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
				<TextField disabled={true} name="localisation" type='text' value={this.props.AppState.currentDevice.postalAdress} onBlur={this.testIdField} fullWidth 
				floatingLabelText=""/>
			</div>

			<div className="ConfirmationRow">
			<span><b>Commentaire :</b></span>
			<TextField
			name="comment"
			className="ConfirmationTextField"
			disabled={true}
			defaultValue={this.props.AppState.currentDevice.comment}
			multiLine rows={2} rowsMax={2}
			style={{textAlign: 'left'}} fullWidth
			floatingLabelText=""
			/></div>

            <div className="messageWarning">
			<p><WarningIcon className="iconWarning" style={{color: 'orange'}} />
			Les renseignements fournis sont modifiables 
			uniquement en effectuant la procédure d'installation
			 à nouveau</p>
			</div>

			<div className="ConfirmationPage confirmButtonRow">
			<RaisedButton onClick={this.handleValidation} 
			label="Confirmer les renseignements" primary={true}/>
			</div>
			{ this.state.waitingOnServer?
			(<div className="ConfirmationRow">
				<CircularProgress />
			</div>)
			: null}
			</div>
			</form>
			);
	}
} 