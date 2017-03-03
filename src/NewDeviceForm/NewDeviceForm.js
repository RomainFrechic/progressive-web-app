import React from 'react';
import { hashHistory } from 'react-router';
import './NewDeviceForm.css';
import MyLocationIcon from 'material-ui/svg-icons/maps/my-location';
import IconButton from 'material-ui/IconButton';
import AdressAutocomplete from '../AdressAutocomplete/AdressAutocomplete'

export default class NewDeviceForm extends React.Component{
	constructor(props){
		super(props);
		this.state={

		};
		this.handleLocalisation = this.handleLocalisation.bind(this);
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
		return(
			<form>
				<div className="NewDeviceForm">
					<div className="NewDeviceHeader">
						<h2>Déclarer une nouvelle installation.</h2>
					</div>

					
					{/*<div className="NewDeviceRow">
						<AdressAutocomplete floatingLabelText="test auto"/>
					</div>

					<IconButton onClick={this.handleLocalisation} tooltipPosition="top-center" 
					tooltip="Utiliser GPS localistion">
						<MyLocationIcon/>
					</IconButton>*/}
				</div>
			</form>
			)
	}
} 