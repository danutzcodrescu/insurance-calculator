import React, { Component } from 'react';
import Login from './Login';
import Insurance from './Insurance';

class App extends Component {

  state = {
    logged: false
  }

  status = (logged, token=null) => {
    let state = {...this.state};
    if (logged) {
      state.token = token;
      
    } else {
      delete state.token;
    }
    state.logged = logged;
    this.setState(state);
  }

  render() {
    return (
      <div className="App">
          {!this.state.logged && 
              <Login login={this.status} />
          }
          {this.state.logged &&
              <Insurance token={this.state.token} logout={this.status} />
          }
      </div>
    );
  }
}

export default App;
