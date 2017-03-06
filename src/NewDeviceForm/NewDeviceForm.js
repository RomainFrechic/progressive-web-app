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
			idError:false,
			idErrorText:"Le device id n'est pas valide.\nIl doit etre un nombre hexadecimal de 4 de longeur.",
			localError: false,
			localErrorText: 'Vous devez entrez une localisation',
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
    	this.testIdField = this.testIdField.bind(this);
    	this.validateId = this.validateId.bind(this);
    	this.validateLocation = this.validateLocation.bind(this);
	}
	componentWillMount(){
		/*before rendering we check the logStatus and we redirect to homepage if false*/
		if(this.props.AppState.isLogged === false){hashHistory.push('/');}
		//Library to format Date and hour in locale time
		moment.locale('fr');
		this.setState({timeOfInstall: moment().format('LLL','LT')});
	}
	
	/*on blur, we test id field with this regex.
	(like in wireframes we ask for a hexa number of 4 length)*/
	testIdField(event){
		const value = event.target.value;
		const isHexa = new RegExp('^([A-Fa-f0-9]{2}){4}$');
		if(isHexa.test(value)===false){ 
			this.setState({idError: true});
		}else{
			this.setState({idError: false});
		}
	}
	
	handleInputChange(event, nextValue){
		const value = nextValue;
		/*the click on the google maps autocomplete suggestion doesnt trigger an event*/
		const name = event? event.target.name : "postalAdress";
		this.setState({[name]: value});
	}
	
	/*will be called when idError is set to true.
		we test the field at each input for validation feedback*/
	validateId(event, nextValue){
		this.testIdField(event);
		this.handleInputChange(event,nextValue);
	}
	validateLocation(event, nextValue){
			this.setState({localError: nextValue? false: true});
			this.handleInputChange(null,nextValue);
	}

	handleValidation(event){
		event.preventDefault();
		if(!this.state.postalAdress){
			console.log('post empty');
			this.setState({localError: true});
			return;
		}
		if(!this.state.id){
			console.log('vide id');
			this.setState({idError: true});
			return;
		}
		if(this.state.idError === false && this.state.localError === false){
				const redirect = hashHistory.push('/install_device/confirmation');
				this.props.setStateApp({currentDevice: this.state}, redirect);
		}	
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
					const postalAdress = results[0].formatted_address;
  					this.setState({waitingOnGeolocation: false});
					/*we need to emulate a user input to set the value on location input*/
					this.validateLocation(null, postalAdress);
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

	render(){
		const idError = this.state.idError;
		const idErrorText = this.state.idErrorText;
		const localError = this.state.localError;
		const localErrorText = this.state.localErrorText;
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
				 <TextField name="id" type='text' value={this.state.id} onBlur={this.testIdField} fullWidth 
				 floatingLabelText="Device id" required onChange={idError?this.validateId:this.handleInputChange}
				 errorText={idError? idErrorText:null}/>
			</div>
			<div className="NewDeviceRow localisationRow">
				<AdressAutocomplete name="postalAdress" floatingLabelText="Localisation" 
				fullWidth={true} onChange={localError?this.validateLocation:this.handleInputChange} required 
				value={this.state.postalAdress} errorText={localError? localErrorText:null} />
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