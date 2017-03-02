import React from 'react';
import './Header.css';
import logo from '../../public/logo.png';
import VerticalMenu from '../VerticalMenu/VerticalMenu';

const Header = (props)=>{
	return(
            <div className="Header">
            	{props.logStatus? <VerticalMenu/>: null}
            	<img src={logo} className="Header-logo" alt="logo"/>
            </div>
           );
}
export default Header;