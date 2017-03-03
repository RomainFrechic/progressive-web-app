import React from 'react';
import moment from 'moment';
import { hashHistory } from 'react-router';
import TextField from 'material-ui/TextField';
import './NewDeviceForm.css';
import MyLocationIcon from 'material-ui/svg-icons/maps/my-location';
import IconButton from 'material-ui/IconButton';
import AdressAutocomplete from '../AdressAutocomplete/AdressAutocomplete';
import RaisedButton from 'material-ui/RaisedButton'

export default class NewDeviceForm extends React.Component{
	constructor(props){
		super(props);
		this.state={

		};
	}
	componentWillMount(){
		/*before rendering we check the logStatus and we redirect to homepage if false*/
		if(this.props.userStatus.isLogged === false){hashHistory.push('/');}
	}
	
	handleLocalisation(){
		console.log('localisation click');
		const geoOptions = {
			timeout: 10 * 1000,
			maximumAge: 1 * 60 * 1000,
		}

		const geoSuccess = (position)=> {
			console.log(position);
		};

		const geoError = (error)=> {
		console.log('Error occurred. Error code: ' + error.code);
		// error.code can be:
		//   0: unknown error
		//   1: permission denied
		//   2: position unavailable (error response from location provider)
		//   3: timed out
		};

  		navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);
	}

  render(){
  	//Library to format Date and hour in locale time
  	moment.locale('fr');
  	const currentDate = moment().format('LLL','LT');
  
  	return(
		<form>
			<div className="NewDeviceForm">
					<div className="NewDeviceHeader NewDeviceRow">
						<h3>Déclarer une nouvelle installation</h3>
					</div>
					<div className="NewDeviceRow">
						 <h3>Installateur : {this.props.userStatus.userName}</h3>
					</div>
					<div className="NewDeviceRow">					 
						 <h3>Date : {currentDate}</h3> 
					</div>
					<div className="NewDeviceRow">
						 <TextField onChange={this.handInputChange} name="deviceId" type='text'
						 value={this.state.deviceId} fullWidth floatingLabelText="Device ID"/>
					</div>
					<div className="NewDeviceRow">
						<AdressAutocomplete floatingLabelText="Localisation" fullWidth={false}/>
						<IconButton onClick={this.handleLocalisation} tooltipPosition="top-center" 
						tooltip="Utiliser GPS localisation">
							<MyLocationIcon/>
						</IconButton>
					</div>
					<div className="NewDeviceRow">
						 <TextField onChange={this.handInputChange} name="commentaires" type='text'
						 value={this.state.commentaires} multiLine rows={2} rowsMax={2} 
						 style={{textAlign: 'left'}} fullWidth floatingLabelText="Commentaire"/>
					</div>
					
					<div className="NewDeviceRow buttonRow">
						  <RaisedButton onClick={this.handClick} label="Valider l'installation" primary={true}/>
					</div>
				</div>		
		</form>
  		)

  }
} 