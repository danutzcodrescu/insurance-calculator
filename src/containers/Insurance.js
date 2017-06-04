import React, { Component } from 'react';
import { get, post } from 'axios';
import apiUrls from '../api/api';

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
    this.form.reset();
    if (this.state.message) {
        const state = {...this.state};
        delete state.message;
        this.setState(state);
    }
  }

  render() {
    const options = this.state.cars.map(car=>
        <option key={car.name} value={car.name}>{car.name}</option>
    );
    return (
      <div>
          <button onClick={()=>this.props.logout(false)}>Logout</button>
          <form onSubmit={(e)=>this.getQuote(e)} ref={(form)=>this.form=form}>
            <input type="text" name="name" placeholder="Name" />
            <select name="carMake">    
                {options}
            </select>
            <input type="number" step="0.01" name="value" placeholder="Car value" />
            <button type="submit">GET PRICE</button>
            <button onClick={()=>this.reset()}>Start over</button>
          </form>
          <p style={{display: this.state.message ? "block" : "none"}}>{this.state.message}</p>
      </div>
    );
  }
}

export default Insurance;
