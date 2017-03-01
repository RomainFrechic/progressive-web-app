import React from 'react';
import Input from '../Input/Input';
import Button from '../Button/Button';
import axios from 'axios';
export default class LoggingForm extends React.Component{
	constructor(props){
		super(props);
		this.state={
			organisation:'',
			loggin:'',
			password:''
		};
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	handleInputChange(event) {
    const target = event.target;
    //we test if the input is or not a checkbox for making sure we take the right value
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }
  
   handleClick(event) {
   	event.preventDefault();
   	const {organisation, loggin, password} = this.state;
   	console.log(organisation, loggin, password);
   	axios.post('http://localhost:8000/api/authenticate',{
   		loggin:loggin,
   		password:password,
   		organisation:organisation
   	})
   	.then(function(response){
	console.log(response);
   	})
   	.catch(function(error){
   	console.log(error);
   	});
   }

	render(){
		return(
			<div className="LoggingForm">
			<form>
				
				<label>Votre nom ou identifiant
					<Input name="loggin" handleInputChange={this.handleInputChange} value={this.state.loggin} type="text"/>				
				</label>
				<label>Organisation
					<Input name="organisation" handleInputChange={this.handleInputChange} value={this.state.organisation} type="text"/>				
				</label>
				<label>Mot de passe
					<Input name="password" handleInputChange={this.handleInputChange} value={this.state.password} type="password"/>				
				</label>
				<Button className="buttonLoggin" handleClick={this.handleClick}>Se connecter</Button>
			</form>
			</div>
			);
	}
} 