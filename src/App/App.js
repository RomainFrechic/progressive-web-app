import React from 'react';
import logo from '../logo.svg';
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
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <div>
          {this.props.children}
        </div>
        
      </div>
    );
  }
}

export default App;