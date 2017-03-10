import React from 'react';
import Header from '../Header/Header';
import {green500} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { hashHistory } from 'react-router';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import DetectingOnline from '../DetectingOnline/DetectingOnline';

/*Theme  is required for using material-ui library https://github.com/callemall/material-ui#usage */

/*
In this "global" component we took the decision to make log validation with 
the state boolean isLogged. Each component will, on lifeHook method "componentWillMount",
evaluate this isLogged and redirect to login page is false.
*/

const intesensTheme = getMuiTheme({
	palette: {
		primary1Color:green500,
	}
});


class App extends React.Component {
	constructor(props){
		super(props);
		this.state={

			isLogged: false,
			userLogin: '',
			userOrganisation: '',
     currentDevice: {
      postalAdress: '',
      latitude: '',
      longitude: '',
      id:'',
      timeOfInstall: '',
      comment:'',
      usedGeolocalisation:false
    }
  }
  this.setStateApp = this.setStateApp.bind(this);
  this.logout = this.logout.bind(this);
  this.newInstall = this.newInstall.bind(this);
  
}

componentWillMount(){
  const currentDevice = window.sessionStorage.getItem("currentDevice");
  if(currentDevice){
   this.setState({currentDevice: JSON.parse(currentDevice)});
 }


    /*simple cookie value finder to read our fake auth token.
    to replace by proper authentification system */
    function getCookieValue(a) {
    	var b = document.cookie.match('(^|;)\\s*' + a + '\\s*=\\s*([^;]+)');
    	return b ? b.pop() : '';


    	/*if the cookie exist and has the fake value*/
    	if(getCookieValue("authToken") === "QpwL5tke4Pnpja7X"){
    		this.setState({isLogged: true});
    	}
    	if(getCookieValue("login")){
    		this.setState({userLogin:getCookieValue("login")}); 
    	}
    	if(getCookieValue("organisation")){
    		this.setState({userOrganisation:getCookieValue("organisation")});
    	}
    }

 }


  /**
   * a setter function bound to the context of App.
   * we pass this function to the  children to allow them to setState of App.
   * @param {ex:{userOrganisation:[string], userLogin:[string], isLogged:[boolean]}}
   */
   setStateApp(userObject, callback){
   	this.setState(userObject,callback);
   }



  /**
   * callback function passed to verticalMenu
   */
   logout(){
   	this.setState({isLogged: false, userLogin: '', userOrganisation: '', currentDevice:{}});
   	document.cookie = 'authToken=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
   	window.sessionStorage.clear();
   	hashHistory.push('/');
   }

   newInstall(){
   	const changeRoute = hashHistory.push('/install_device');
   	window.sessionStorage.clear();
   	this.setState({currentDevice:{}}, changeRoute);
   }


   render() {

   	/*a "hack" that is required to pass props to this.props.children*/
   	const {children} = this.props;
   	const clonedChildren = React.cloneElement(children,
   		{setStateApp: this.setStateApp, AppState:this.state});


   	return (
   		<MuiThemeProvider muiTheme={intesensTheme}>
      
      <div className="App">
     
     <DetectingOnline />
      <Header newInstall={this.newInstall} logout={this.logout} logStatus={this.state.isLogged}/>
      {clonedChildren}
      </div>
      </MuiThemeProvider>
      )
   }
 }

 export default App;
