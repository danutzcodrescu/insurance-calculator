import React, { Component } from 'react';
import apiUrls from '../api/api';
import { post } from 'axios';

class Login extends Component {

	state= {
		user: false,
		password: false
	}

	login(e) {
		e.preventDefault();
		const { target } = e;
		let state = {...this.state};
		state.user=target.user.value.length!==0 ? false : true;
		state.password= target.password.value.length!==0 ? false : true;
		if (state.error) delete state.error;
		if (target.password.value.length!==0 && target.user.value.length!==0) {
			const body = {email:target.user.value, password: target.password.value};
			post(apiUrls.login, body)
			.then(() => {
				this.props.login(true);
			})
			.catch(err=>{
				this.setState({
					...this.state,
					error: true
				})
			})

		} else {
			this.setState(state);
		}
	}

  render() {

    return (
      <form onSubmit={(e)=>this.login(e)}>
        <div className="row">
		    <div className="small-12 columns">
		      <div className="row">
		        <div className="small-2 columns">
		          <label htmlFor="user" className="right inline">User</label>
		        </div>
		        <div className="small-4 columns">
		          <input type="text" name="user" id="user" placeholder="Username" />
		          {this.state.user && 
		          <small className="error">User field cannot be empty</small>}	
		        </div>
		        <div className="small-2 columns">
		          <label htmlFor="password" className="right inline">Password</label>
		        </div>
		        <div className="small-4 columns">
		          <input type="password" name="password" id="password" placeholder="Password" />
		          {this.state.password && 
		          <small className="error">Password cannot be empty</small>}	
		        </div>
		      </div>
		    </div>
		    <button type="submit" className="button radius">Login</button>
		    {this.state.error && <small className="error">Invalid username or password</small>}	
		</div>
      </form>
    );
  }
}

export default Login;
