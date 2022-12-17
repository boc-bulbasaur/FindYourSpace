
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import Button from '@mui/material/Button';
import LockIcon from '@mui/icons-material/Lock';

class Payment extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      first: '',
      last: '',
      add_1: '',
      add_2: '',
      city: '',
      state: '',
      zip: '',
      full_name: '',
      cc: '',
      expiry: '',
      cvv: ''
    }

    this.handleChange = this.handleChange.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.first !== prevState.first) {
      return ({
        first: nextProps.first,
        last: nextProps.last
      });
    }
    return null
  }

  handleChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({
      [name]: value
    });
  }

  render () {
    return (
      <div className="newRes">
        <h3>Billing Address</h3>
        <form /*onSubmit={onSubmit}*/>
          <div className="billing">
            <div className="billing-row">
              <div className="billing-col col-50">
                <label className="label"><PersonIcon></PersonIcon>First Name</label>
                <input type="text" defaultValue={this.state.first} onChange={this.handleChange} name="first" placeholder="John" />
              </div>
              <div className="billing-col col-50">
                <label className="label"><PersonIcon></PersonIcon>Last Name</label>
                <input type="text" defaultValue={this.state.last} onChange={this.handleChange} name="last" placeholder="Doe"/>
              </div>
            </div>
            <br/>
            <div className="billing-col">
              <div className="billing-col address1">
                <label><HomeIcon></HomeIcon>Address Line 1</label>
                <input type="text" defaultValue={this.state.add_1} onChange={this.handleChange} name="add_1" placeholder="1234 Main Street" />
                <br/>
              </div>
              <div className="billing-col">
                <label><HomeIcon></HomeIcon>Address Line 2</label>
                <input type="text" defaultValue={this.state.add_2} onChange={this.handleChange} name="add_2" placeholder="Apt / Suite / Unit (Optional)" />
                <br/>
              </div>
            </div>
            <div className="billing-row">
              <div className="billing-col col-33">
                <label>City</label>
                <input type="text" defaultValue={this.state.city} onChange={this.handleChange} name="city" placeholder="New York City"/>
              </div>
              <div className="billing-col col-33">
                <label>State</label>
                <input type="text" defaultValue={this.state.state} onChange={this.handleChange} name="state" placeholder="NY"/>
              </div>
              <div className="billing-col col-33">
                <label>Zip Code</label>
                <input type="text" defaultValue={this.state.zip} onChange={this.handleChange} name="zip" placeholder="77777"/>
              </div>
            </div>
          </div>
          <br />
          <div className="billing">
            <h3>Payment Information</h3>
            <p>Accepted Cards</p>
            <div className="cards">
              <Image
                src="/../public/visa.png"
                alt="credit cards"
                className="map"
                width={100}
                height={100}
              />
              <Image
                src="/../public/discover.png"
                alt="credit cards"
                className="map"
                width={100}
                height={100}
              />
              <Image
                src="/../public/american-express.png"
                alt="credit cards"
                className="map"
                width={100}
                height={100}
              />
              <LockIcon></LockIcon>
            </div>
          <label>Name on Card</label>
          <input type="text" required defaultValue={this.state.full_name} onChange={this.handleChange} name="full_name" placeholder="John M. Doe" />
          <br />
          <label>Credit Card Number</label>
          <input type="text" required defaultValue={this.state.cc} onChange={this.handleChange} name="cc" placeholder="5555-8888-0000-1111" />
          <br />
          <div className="billing-row">
            <div className="billing-col col-50">
              <label>Expiry Date</label>
              <input type="text" required defaultValue={this.state.expiry} onChange={this.handleChange} name="expiry" placeholder="MM/YY" />
            </div>
            <div className="billing-col col-50">
              <label>CVV</label>
              <input type="text" required defaultValue={this.state.cvv} onChange={this.handleChange} name="cvv" placeholder="111" />
            </div>
          </div>
          <br/>
          {/* <button type="submit">CHECKOUT</button> */}
          <Button color="primary" variant="contained">Checkout</Button>
        </div>
      </form>
      </div>
    )
  }
}
export default Payment;