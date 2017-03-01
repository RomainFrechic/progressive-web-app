import React from 'react';

const Input = (props)=>{
		return(
			<input name={props.name} onChange={props.handleInputChange} value={props.value} type={props.type}/>
			);
}

Input.propTypes ={
	name: React.PropTypes.string.isRequired,
	handleInputChange: React.PropTypes.func.isRequired,
	value: React.PropTypes.string.isRequired,
	type: React.PropTypes.string.isRequired,
}

export default Input;