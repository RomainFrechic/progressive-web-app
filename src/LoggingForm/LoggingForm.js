import React from 'react';
import { hashHistory } from 'react-router';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import Paper from 'material-ui/Paper';
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
			errorMessage: '',
			errorNetwork:false,
			errorNetworkMessage: ''
		};
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	componentWillMount(){
		/*before rendering we check the logStatus and we redirect to homepage if false*/
		if(this.props.AppState.isLogged === true){
		// 	hashHistory.push('/');
		// }else{
			hashHistory.push('/install_device');
		}
	}


	handleInputChange(event, nextValue) {
		const value = nextValue;
		const name = event.target.name;		
		this.setState({[name]: value});
	}

	handleClick(event) {
		this.setState({waitingOnServer:true});
		/*hack to keep the global context in the axios promise*/
		event.preventDefault();
		const {organisation, login, password} = this.state;
		/* 
		We get our user info from the state and we send them for authentification.
		*/
		axios.post('https://reqres.in/api/login',{
			username:login,
			password:password,
			organisation:organisation
		})
		.then((response)=>{
			this.setState({waitingOnServer:false});
			if(response.status === 200){
				/*here goes authentification*/
				const authToken = response.data.token;
				this.props.setStateApp({userOrganisation:organisation,userLogin:login,isLogged:true});
				document.cookie = `authToken=${authToken};path="/";`
				document.cookie = `login=${login};path="/";`
				document.cookie = `organisation=${organisation};path="/";`
				hashHistory.push('/install_device');
			}
		})
		.catch((error)=>{
			this.setState({waitingOnServer:false},()=>{
				if(!error.response){
					const errorNetworkMessage = `Il semblerais que vous n'ayez pas de réseau. Réessayer lors ce que vous aurez du réseau.
						${error.message}`;
					this.setState({errorNetwork: true, errorNetworkMessage: errorNetworkMessage});
				}else{
					/*this is our basic error handling. You may want to replace this part*/
					this.setState({errorMessage: errorHandling(error)});
				}
			});
		});
	}

	render(){
		return(
			<form>
			<div className="LoggingForm">
			{this.state.errorNetwork !== false?
				(<Paper className="popupError" zDepth={3}>
					<h4>{this.state.errorNetworkMessage}</h4>
					<div className="errorButtons">
						<div><RaisedButton label="Fermer" onClick={()=>this.setState({errorNetwork:false})}/></div>
					</div>
				</Paper>)
				:null
			}
			<div className="LoggingRow">
			<TextField onChange={this.handleInputChange} name="organisation" type='text'
			value={this.state.organisation} floatingLabelText="Organisation"/>
			</div>
			<div className="LoggingRow">
			<TextField onChange={this.handleInputChange} name="login" type='text'
			value={this.state.login} floatingLabelText="Votre nom ou identifiant"/>
			</div>
			<div className="LoggingRow">
			<TextField onChange={this.handleInputChange} name="password" 
			value={this.state.password} type='password' floatingLabelText="Mot de passe"/>
			</div>
			{this.state.errorMessage?
				(<div className="LoggingRow LoggingError">
				<p>{this.state.errorMessage}</p>
				</div>)
				:null}
			<div className="LoggingRow logButtonRow">
				<RaisedButton onClick={this.handleClick} label="Se connecter" primary={true}/>
			{ this.state.waitingOnServer?
			(<CircularProgress />)
			: null}
			</div>
			</div>
			</form>
		);
	}
} 