import React from 'react';
import Header from '../Header/Header';
import {green500} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { hashHistory } from 'react-router';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
/*Theme  is required for using material-ui library https://github.com/callemall/material-ui#usage */

/*
In this "global" component we took the decision to make log validation with 
the state boolean isLogged.Each component will , on lifeHook method "componentWillMount",
make a verification of this state. This is probably not the best way to handle
user authentification but without knowledge of the back-end it's the only one we know.
Caveat is that on reload , authentifaction will be required again.
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
    /*simple cookie value finder to read our fake auth token.
      to replace by proper authentification system */
    function getCookieValue(a) {
      var b = document.cookie.match('(^|;)\\s*' + a + '\\s*=\\s*([^;]+)');
      return b ? b.pop() : '';
    }
    /*if the cookie exist and has the fake value*/
    if(getCookieValue("authToken") === "QpwL5tke4Pnpja7X"){
      this.setState({isLogged: true});
    }
  }
  /**
   * a setter function bound to the context of App.
   * we pass this function to the  children to allow them to setState of App.
   * @param {ex:{userOrganisation:[string], userLogin:[string], isLogged:[boolean]}}
   */
   setStateApp(userObject){
    this.setState(userObject);
  }
  
  /**
   * callback function passed to verticalMenu
   */
  logout(){
    this.setState({isLogged: false, userLogin: '', userOrganisation: '', currentDevice:{}});
    document.cookie = 'authToken=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    hashHistory.push('/');
  }
  newInstall(){
    this.setState({currentDevice:{}});
    hashHistory.push('/install_device');
  }
  

  render() {
    /*a "hack" that is required to pass props to this.props.children*/
    const {children} = this.props;
    const clonedChildren = React.cloneElement(children,
      {setStateApp: this.setStateApp, AppState:this.state});

    return (
      <MuiThemeProvider muiTheme={intesensTheme}>
        <div className="App">
          <Header newInstall={this.newInstall} logout={this.logout} logStatus={this.state.isLogged}/>
          {clonedChildren}
        </div>
      </MuiThemeProvider>
      )
  }
}

export default App;
