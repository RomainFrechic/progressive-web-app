import React from 'react';
import logo from '../../public/logo.png';
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state={test:'truc'};
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
        </div>
        <div>
          {this.props.children}
        </div>
        
      </div>
    );
  }
}

export default App;