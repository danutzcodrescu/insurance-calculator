import React, { Component } from 'react';
import { get } from 'axios';
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
    if (target.price.value < 5000 || target.price.value > 75000) {
        this.setState({
            ...this.state,
            message: "The price of the car should be between 5,000 euro and 75,000 euro"
        });
    } else {
        const car = this.state.cars.find(car=>car.name===target.carModel.value);
        const price = car.fee + car.commission * target.price.value / 100;
        this.setState({
            ...this.state,
            message: "The price of the insurance policy is: " + price.toLocaleString('en-US', {minimumFractionDigits: 2,
  maximumFractionDigits: 2})
        });
    }
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
        <option value={car.name}>{car.name}</option>
    );
    return (
      <div>
          <button onClick={()=>this.props.logout(false)}>Logout</button>
          <form onSubmit={(e)=>this.getQuote(e)} ref={(form)=>this.form=form}>
            <input type="text" name="name" placeholder="Name" />
            <select name="carModel">    
                {options}
            </select>
            <input type="text" name="price" placeholder="Price" />
            <button type="submit">GET PRICE</button>
            <button onClick={()=>this.reset()}>Start over</button>
          </form>
          <p style={{display: this.state.message ? "block" : "none"}}>{this.state.message}</p>
      </div>
    );
  }
}

export default Insurance;
