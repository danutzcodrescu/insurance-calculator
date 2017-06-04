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
			.then((resp) => {
				this.props.login(true, resp.data);
			})
			.catch(err=>{
				console.log(err);
				state.error = true;
				this.setState(state);
			})

		} else {
			this.setState(state);
		}
	}

  render() {

    return (
      <form onSubmit={(e)=>this.login(e)}>
        <div className={this.state.user ? "form-group has-error has-feedback" : "form-group"}>
          <label htmlFor="user" className="col-md-1 control-label">User:</label>
          <div className="col-md-4">
          	<input className="form-control" type="email" name="user" id="user" placeholder="Username" />
          	{this.state.user && 
          	 <div className="row">
          	 	<small className="alert alert-danger">User field cannot be empty</small>
          	 </div>
          	}  	
          </div>	
        </div>
        <div className={this.state.password ? "form-group has-error has-feedback" : "form-group"}>
          <label htmlFor="password" className="col-md-1 control-label">Password:</label>
          <div className="col-md-4">
          	<input className="form-control" type="password" name="password" id="password" placeholder="Password" />
          	{this.state.password && 
          		<div className="row">
          			<small className="alert alert-danger">Password cannot be empty</small>
          		</div>
	        }
          </div>
        </div>
	      
	    <button type="submit" className="btn btn-primary">Login</button>
	    <div className="form-group">
		    {this.state.error && <small className="col-md-offset-1 col-md-4 alert alert-danger">Invalid username or password</small>}	
	    </div>	
      </form>
    );
  }
}

export default Login;
