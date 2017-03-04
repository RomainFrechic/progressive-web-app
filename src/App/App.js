import React from 'react';
import Header from '../Header/Header';
import {green500} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
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
      isLogged: true,
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
  }
  
  /**
   * Use setState of App to remember the current user
   * this setter is passed to children components
   * @param {ex:{userOrganisation:[string], userLogin:[string], isLogged:[boolean]}}
   */
   setStateApp(userObject){
    this.setState(userObject);
  }

  render() {
    /*a "hack" that is required to pass props to the children*/
    const {children} = this.props;
    const clonedChildren = React.cloneElement(children,
      {setStateApp: this.setStateApp, AppState:this.state});

    return (
      <MuiThemeProvider muiTheme={intesensTheme}>
        <div className="App">
          <Header logStatus={this.state.isLogged}/>
          {clonedChildren}
        </div>
      </MuiThemeProvider>
      )
  }
}

export default App;
