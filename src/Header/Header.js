import React from 'react';
import './Header.css';
import banner from '../../public/img/banner_720px.png';
import VerticalMenu from '../VerticalMenu/VerticalMenu';

const Header = (props)=>{
	return(
            <div className="Header">
            	{props.logStatus? <VerticalMenu newInstall={props.newInstall} logout={props.logout}/>: null}
            	<img src={banner} className="Header-logo" alt="logo"/>
            </div>
           );
}
export default Header;