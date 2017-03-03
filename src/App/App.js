import React from 'react';
import Header from '../Header/Header';
import {green500} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
/*Theme  is required for using material-ui library https://github.com/callemall/material-ui#usage */

/*
In this "global" component we took decided to make log validation with 
the state boolean isLogged.Each component will on the method "will mount",
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
      login: '',
      userOrganisation: ''
    }
    this.setStateUser = this.setStateUser.bind(this);
  }
  
  /**
   * Use setState of App to remember the current user
   * @param {{userOrganisation:[string], login:[string], isLogged:[boolean]}}
   */
   setStateUser(userObject){
    this.setState(userObject);
  }

  render() {
    /*a "hack" that is required to pass props the children*/
    const {children} = this.props;
    const clonedChildren = React.cloneElement(children,
      {setStateUser: this.setStateUser, userStatus:this.state});

    return (
      <MuiThemeProvider muiTheme={intesensTheme}>
      <div>
      <Header logStatus={this.state.isLogged}/>
      {clonedChildren}
      </div>
      </MuiThemeProvider>
      )
  }
}

export default App;
