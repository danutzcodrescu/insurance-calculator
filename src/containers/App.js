import React, { Component } from 'react';
import '../css/App.css';
import Login from './Login';

class App extends Component {

  state = {
    logged: false
  }

  status = (logged) => {
    this.setState({
      ...this.state,
      logged
    });
  }

  render() {
    return (
      <div className="App">
          {!this.state.logged && 
              <Login login={this.status}/>
          }
      </div>
    );
  }
}

export default App;
