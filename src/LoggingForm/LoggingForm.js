import React from 'react';
import { hashHistory } from 'react-router';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import './LoggingForm.css';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import errorHandling from './errorHandling.js'

export default class LoggingForm extends React.Component{
	constructor(props){
		super(props);
		this.state={
			organisation:'',
			login: '',
			password: '',
			waitingOnServer:false,
			errorMessage: ''
		};
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	componentWillMount(){
		/**/
	}

	handleInputChange(event, nextValue) {
		const value = nextValue;
		const name = event.target.name;		
		this.setState({[name]: value});
	}

	handleClick(event) {
		this.setState({waitingOnServer:true});
		const me = this;
		/*hack to keep the global context in the axios promise*/
		event.preventDefault();
		const {organisation, login, password} = this.state;
		/*We get our user info from the state and we send them for authentification*/
		axios.post('http://localhost:8000/api/authenticate',{
			login:login,
			password:password,
			organisation:organisation
		})
		.then(function(response){
			me.setState({waitingOnServer:false});
			if(response.status === 200){
				me.props.setStateApp({userOrganisation:organisation, userLogin:login, isLogged:true});
				hashHistory.push('/install_device');
			}
		})
		.catch(function(error){
			/*this is our basic error handling. You may want to replace this part*/
			me.setState({waitingOnServer:false, errorMessage: errorHandling(error)});
		});
	}

	render(){
		return(
			<div>
				<form>
	<div className="LoggingForm">
		<div className="LoggingRow">
			 <TextField onChange={this.handleInputChange} name="login" type='text'
			 value={this.state.login} floatingLabelText="Votre nom ou identifiant"/>
		</div>
		<div className="LoggingRow">
			 <TextField onChange={this.handleInputChange} name="organisation" type='text'
			 value={this.state.organisation} floatingLabelText="Organisation"/>
		</div>
		<div className="LoggingRow">
			 <TextField onChange={this.handleInputChange} name="password" 
			 value={this.state.password} type='password' floatingLabelText="Mot de passe"/>
		</div>
		<div className="LoggingRow">
		{this.state.errorMessage?
			 (<p>{this.state.errorMessage}</p>)
			 :null}
		</div>
		<div className="LoggingRow buttonRow">
			  <RaisedButton onClick={this.handleClick} label="Se connecter" primary={true}/>
		</div>
		{ this.state.waitingOnServer?
		(<div className="LoggingRow">
			<CircularProgress />
		</div>)
		: null}
	</div>
			</form>
		</div>
			);
	}
} 