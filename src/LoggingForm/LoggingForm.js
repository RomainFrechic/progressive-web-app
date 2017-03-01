import React from 'react';
import Input from '../Input/Input';

export default class LoggingForm extends React.Component{
	constructor(props){
		super(props);
		this.state={
			logginValue: ''
		};
		this.handleInputChange = this.handleInputChange.bind(this);
	}

	handleInputChange(event) {
    const target = event.target;
    //we test if the input is or not a checkbox for make sure we take the right value
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
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
			</form>
			</div>
			);
	}
} 