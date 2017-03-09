import React from 'react';
import moment from 'moment';
import Paper from 'material-ui/Paper';
import { hashHistory } from 'react-router';
import TextField from 'material-ui/TextField';
import './NewDeviceForm.css';
import MyLocationIcon from 'material-ui/svg-icons/maps/my-location';
import IconButton from 'material-ui/IconButton';
import AdressAutocomplete from '../AdressAutocomplete/AdressAutocomplete';
import RaisedButton from 'material-ui/RaisedButton'
import CircularProgress from 'material-ui/CircularProgress';
import Snackbar from 'material-ui/Snackbar';

export default class NewDeviceForm extends React.Component{
	constructor(props){
		super(props);
		this.state={
			idError:false,
			idErrorText:"L’adresse est au format hexadécimal (ex : 012345ABCDEF)",
			localError: false,
			localErrorText: 'Vous devez entrez une localisation',
			errorGeolocalisation:false,
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
    	this.idFieldIsValid = this.idFieldIsValid.bind(this);
    	this.validateId = this.validateId.bind(this);
    	this.validateLocation = this.validateLocation.bind(this);
	}

	componentWillMount(){
		/*before rendering we check the logStatus and we redirect to homepage if false*/
		if(this.props.AppState.isLogged === false){hashHistory.push('/');}
		//we re-populate the form
		const currentDevice = this.props.AppState.currentDevice;
        this.setState({
        	postalAdress:currentDevice.postalAdress,
        	latitude:currentDevice.latitude,
        	longitude:currentDevice.longitude,
        	id:currentDevice.id,
        	timeOfInstall:currentDevice.timeOfInstall,
        	comment:currentDevice.comment,
        	usedGeolocalisation:currentDevice.usedGeolocalisation
        });

		//Library to format Date and hour in locale time
		if(!this.state.timeOfInstall){
			moment.locale('fr');
			this.setState({timeOfInstall: moment().format('LLL','LT')});
		}
	};

	/* we test id field with a regex.
	(like in wireframes we ask for a hexa number of 4 length)*/
	idFieldIsValid(value){
		const LONGUEUR_MIN_ID = 4;
		/*change hexaId required length by changing this part: '^([A-Fa-f0-9]{1}){minValue,maxvalue}$', leave a value empty for not setting a limit*/
		const isHexa = new RegExp('^([A-Fa-f0-9]{1}){4,}$');
		if(value.length >= LONGUEUR_MIN_ID){ 
			if(isHexa.test(value)===false){
				this.setState({idError: true});
				return false;
			}else{
				this.setState({idError: false});
				return true;
			}
		}else{
			this.setState({idError: true});
			return false;
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
		this.idFieldIsValid(nextValue);
		this.handleInputChange(event,nextValue);
	}
	validateLocation(event, nextValue){
			this.setState({localError: nextValue? false: true});
			this.handleInputChange(null,nextValue);
	}

	handleValidation(event){
		
		const LONGEUR_MIN_LOCAL_INPUT = 1;
		event.preventDefault();
		/*setState method is asynchronous, so we need the variable error to be set synchronously*/
		let error = false;
		if(!this.idFieldIsValid(this.state.id)){
			error = true;
		}
		if(this.state.postalAdress < LONGEUR_MIN_LOCAL_INPUT){
			error = true;
			this.setState({localError: true});
		}
		if(error === false && !this.state.localError && !this.state.idError && this.state.id && this.state.postalAdress){
			this.setState({waitingOnGeolocation:false}, ()=>{
				window.sessionStorage.setItem("currentDevice", JSON.stringify(this.state));
				this.props.setStateApp({currentDevice: this.state, successInstall: false, errorInstall:false},()=>{
					hashHistory.push('/install_device/confirmation');
				});
			});
		}else{
			/*error animation*/
			console.log('anime error')
		}	
	}

	handleLocation(){
		/* 
		timeout at 15s (may be too long)
		enabling highAccuracy may not be required :
		https://developers.google.com/web/fundamentals/native-hardware/user-location/
		 */
		const geoLocationOptions = {
			timeout: 15 * 1000,
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
  			console.log(error);
  			this.setState({waitingOnGeolocation: false,errorGeolocalisation: error.code});
  			if(error.code === 1){
				this.setState({errorGeoMessage: `Erreur. Veuillez activer la géolocalisation puis rafraichir la page.`});
  			}else if(error.code === 3){
				this.setState({errorGeoMessage:`Erreur. Le délai d'attente maximum a été dépassé.`});
  			}else if(error.code === 2){
				this.setState({errorGeoMessage:`Erreur. Le serveur n'as pas été capable de vous localiser.`});
  			}else{
				this.setState({errorGeoMessage:`Erreur. Erreur inconnue.`});
  			}
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
	<div>
	<form className="NewDeviceForm">
			{this.props.AppState.errorInstall?
					(<div className="feedbackMessageError">
						{this.props.AppState.errorInstallMessage}
					</div>)
					:null
			}
			<Snackbar onRequestClose={()=>this.props.setStateApp({successInstall: false})} 
			name="feedbackMessageError" open={this.props.AppState.successInstall}
			 message={this.props.AppState.successInstallMessage} />

			{this.state.errorGeolocalisation !== false?
				(<Paper className="popupError" zDepth={3}>
					<h4>{this.state.errorGeoMessage}</h4>
					<div className="errorButtons">
						<div><RaisedButton label="Fermer" onClick={()=>this.setState({errorGeolocalisation:false})}/></div>
						{this.state.errorGeolocalisation === 1?(<div><RaisedButton onClick={()=>window.location.reload(true)} label="Rafraichir"/></div>):null}
					</div>
				</Paper>)
				:null
			}
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
				 <TextField name="id" type='text' value={this.state.id} onBlur={this.idFieldIsValid.bind(this,this.state.id)} fullWidth
				 floatingLabelText="Adresse IDIAG" required onChange={idError?this.validateId:this.handleInputChange}
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
			
			<div className="NewDeviceRow newButtonRow">
				  <RaisedButton onClick={this.handleValidation} label="Valider l'installation" primary={true}/>
			</div>
		</form>
	</div>		
	)

  }
} 