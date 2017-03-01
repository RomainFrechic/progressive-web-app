import React from 'react';

export default class Input extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		return(
			<input name={this.props.name} onChange={this.props.handleInputChange} value={this.props.value} type={this.props.type}/>
			);
	}
}
Input.propTypes ={
	name: React.PropTypes.string.isRequired,
	handleInputChange: React.PropTypes.func.isRequired,
	value: React.PropTypes.string.isRequired,
	type: React.PropTypes.string.isRequired,
}