import React from 'react';
import moment from 'moment';
import { hashHistory } from 'react-router';
import TextField from 'material-ui/TextField';
import './NewDeviceForm.css';
import MyLocationIcon from 'material-ui/svg-icons/maps/my-location';
import IconButton from 'material-ui/IconButton';
import AdressAutocomplete from '../AdressAutocomplete/AdressAutocomplete';
import RaisedButton from 'material-ui/RaisedButton'
import CircularProgress from 'material-ui/CircularProgress';

export default class NewDeviceForm extends React.Component{
	constructor(props){
		super(props);
		this.state={
			waitingOnGeolocation: false,
			usedGeolocalisation: false,
		    latitude: '',
		    longitude: '',
		    postalAdress: '',
		    id:'',
		    timeOfInstall: '',
		    comment:''
    	};
    	this.handleLocation = this.handleLocation.bind(this);
    	this.handleInputChange = this.handleInputChange.bind(this);
    	this.handleValidation = this.handleValidation.bind(this);
	}
	componentWillMount(){
		/*before rendering we check the logStatus and we redirect to homepage if false*/
		if(this.props.AppState.isLogged === false){hashHistory.push('/');}
		//Library to format Date and hour in locale time
		moment.locale('fr');
		this.setState({timeOfInstall: moment().format('LLL','LT')});
	}
	
	handleLocation(){
		/* 
		enabling highAccuracy may not be required :
		https://developers.google.com/web/fundamentals/native-hardware/user-location/
		 */
		const geoLocationOptions = {
			timeout: 10 * 1000,
			maximumAge: 2 * 60 * 1000,
			enableHighAccuracy: true
		}
		/*
		succes callback
		*/
		const geoLocationSuccess = (position)=> {
			const{longitude,latitude} = position.coords;
	  		/*
	  		if geolocation was a success, we have a lat and a long, but we need to send the user a feedback on 
	  		his action, so we convert the gps coords to postal adress , using google maps geocoder api, and we
	  		display them in the location input
	  		 */
	  		const geocoder = new window.google.maps.Geocoder();
	  		const locationObject = {'location': {lat: latitude, lng: longitude}};
			geocoder.geocode(locationObject, (results, status)=> {
				if(status === window.google.maps.GeocoderStatus.OK) {
      				this.setState({
						longitude,
						latitude,
						usedGeolocalisation: true
					});
					/*we need to emulate a user input to set the value on location input*/
					const postalAdress = results[0].formatted_address;
  					this.setState({waitingOnGeolocation: false});
					this.handleInputChange(null, postalAdress);
      			}else {
	      			/*geocode error handling goes here*/
  					this.setState({waitingOnGeolocation: false});
	      			window.alert('Geocoder failed due to: ' + status);
    			}
			});
		};
		const geoLocationError = (error)=> {
			/* 
			geolocation error handling goes here
			error.code can be:
			0: unknown error
			1: permission denied
			2: position unavailable (error response from location provider)
			3: timed out
			*/
  			this.setState({waitingOnGeolocation: false});
			window.alert('Geolocation failed, error code: ' + error.code);
		};

  		navigator.geolocation.getCurrentPosition(geoLocationSuccess, geoLocationError, geoLocationOptions);
  		this.setState({waitingOnGeolocation: true});
	}

	handleValidation(event){
		event.preventDefault();
		this.props.setStateApp({currentDevice: this.state});
		hashHistory.push('/install_device/confirmation');
	}

	handleInputChange(event, nextValue){
		const value = nextValue;
		/*the click on the google maps autocomplete suggestion doesnt trigger an event*/
		const name = event? event.target.name : "postalAdress";
		this.setState({[name]: value});
	}

  render(){
  	//Library to format Date and hour in locale time
  	moment.locale('fr');
  	const currentDate = moment().format('LLL','LT');
	return(
	<form>
		{this.props.children}
	<div className="NewDeviceForm">
			<div className="NewDeviceHeader NewDeviceRow">
				<h4>Déclarer une nouvelle installation</h4>
			</div>
			<div className="NewDeviceRow installateurRow">
				 <span><b>Installateur :</b> {this.props.AppState.userLogin}</span>
			</div>
			<div className="NewDeviceRow dateRow">					 
				 <span><b>Date :</b> {this.state.timeOfInstall}</span> 
			</div>
			<div className="NewDeviceRow">
				 <TextField onChange={this.handleInputChange} name="id" type='text'
				 value={this.state.id} fullWidth floatingLabelText="Device id"/>
			</div>
			<div className="NewDeviceRow localisationRow">
				<AdressAutocomplete name="postalAdress" floatingLabelText="Localisation" fullWidth={true}
				onChange={this.handleInputChange} value={this.state.postalAdress}/>
				{this.state.waitingOnGeolocation? <CircularProgress/> :
					<IconButton onClick={this.handleLocation} tooltipPosition="top-center" 
					tooltip="Utiliser GPS localisation">
						<MyLocationIcon/>
					</IconButton>
				}
			</div>
			<div className="NewDeviceRow">
				 <TextField onChange={this.handleInputChange} name="comment" type='text'
				 value={this.state.comment} multiLine rows={2} rowsMax={2} 
				 style={{textAlign: 'left'}} fullWidth floatingLabelText="Commentaire"/>
			</div>
			
			<div className="NewDeviceRow buttonRow">
				  <RaisedButton onClick={this.handleValidation} label="Valider l'installation" primary={true}/>
			</div>
		</div>		
	</form>
	)

  }
} 