import React from 'react';

const Button = (props) => {
  let className = `Button ${props.className}`;

	return (		
		<button className={className} onClick={props.handleClick}>
		{props.children}</button>
		);
};

export default Button;