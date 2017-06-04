import React, { Component } from 'react';
import { get, post } from 'axios';
import apiUrls from '../api/api';
import '../css/App.css';

class Insurance extends Component {

  state = {cars: []}

  componentDidMount() {
    get(apiUrls.cars)
    .then(resp=>{
        this.setState({
          ...this.state, 
          cars:resp.data
        });
    })
    .catch(err=>console.error(err));
  }

  getQuote(e) {
    e.preventDefault();
    const { target } = e;
    let status = "Reject";
    let price = 0;
    if (target.value.value < 5000 || target.value.value > 75000) {
        this.setState({
            ...this.state,
            message: "The price of the car should be between 5,000 euro and 75,000 euro"
        });
    } else {
        const car = this.state.cars.find(car=>car.name===target.carMake.value);
        price = car.fee + car.commission * target.value.value / 100;
        status = "OK";
        this.setState({
            ...this.state,
            message: "The price of the insurance policy is: " + price.toLocaleString('en-US', {minimumFractionDigits: 2,
  maximumFractionDigits: 2})
        });
    }
    let obj = {};
    obj.Name = target.name.value;
    obj.CarMake = target.carMake.value;
    obj.Value = target.value.value;
    obj.Price = price;
    obj.Status = status;
    post(apiUrls.insurances, obj, {headers: {'X-Token': this.props.token}})
    .then(resp=>{
        console.log('insurance added to DB succesfull')
    })
    .catch(err=>{
        console.error(err);
        alert('There was a problem on the backend. Please try to submit the insurancy policy to DB again.');
    })
  }

  reset() {
    if (this.state.message) {
        this.setState({...this.state, message:undefined});
    }
    this.form.reset();
    
  }

  render() {
    const options = this.state.cars.map(car=>
        <option key={car.name} value={car.name}>{car.name}</option>
    );
    let cssClass = null;
    if (this.state.message) {
        cssClass = (this.form.value.value<5000 || this.form.value.value>75000) ? "alert alert-warning" : "alert alert-success";
    }
    return (
      <div className="container">
          <div className="row menu">
            <button className="btn btn-info pull-right" onClick={()=>this.props.logout(false)}>Logout</button>
            <a className="btn btn-info col-md-2" rel="noopener noreferrer" target="_blank" href={apiUrls.insurances}>All insurance policies</a>
          </div>
          <form onSubmit={(e)=>this.getQuote(e)} ref={(form)=>this.form=form}>
            <div className="row">
                <label htmlFor="name" className="col-md-2 label-control">Name</label>
                <div className="col-md-8">
                    <input className="form-control" type="text" id="name" name="name" placeholder="Name" required />
                </div>   
            </div>
            <div className="row">
                <label className="col-md-2 label-control">Car make</label>
                <div className="col-md-8">
                    <select name="carMake">    
                        {options}
                    </select>
                </div>    
            </div>
            <div className="row">
                <label htmlFor="value" className="col-md-2 label-control">Value of the car <small>including VAT</small></label>
                <div className="col-md-8">
                    <input className="form-control" id="value" type="number" step="0.01" name="value" placeholder="Car value" required/>
                </div>   
            </div> 
            <button className="btn btn-primary" type="submit">GET PRICE</button>
          </form>
          <button className="btn btn-warning reset" onClick={()=>this.reset()}>Start over</button>
          {this.state.message && 
            <p className={cssClass}>{this.state.message}</p>
          }
          
      </div>
    );
  }
}

export default Insurance;
