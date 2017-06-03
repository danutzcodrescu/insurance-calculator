import React, { Component } from 'react';
import Login from './Login';
import Insurance from './Insurance';

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
              <Login login={this.status} />
          }
          {this.state.logged &&
              <Insurance logout={this.status} />
          }
      </div>
    );
  }
}

export default App;
