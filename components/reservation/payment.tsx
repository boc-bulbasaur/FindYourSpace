import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import Button from '@mui/material/Button';
import LockIcon from '@mui/icons-material/Lock';
import styles from '../../styles/reservation.module.css';
import ReCAPTCHA from 'react-google-recaptcha';

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
    this.onReCAPTCHAChange = this.onReCAPTCHAChange.bind(this);
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

  async onReCAPTCHAChange(captchaCode) {
    // If the reCAPTCHA code is null or undefined indicating that
    // the reCAPTCHA was expired then return early
    if (!captchaCode) {
      return;
    }
    try {
      const response = await fetch("/api/reCaptcha", {
        method: "POST",
        body: JSON.stringify({ captcha: captchaCode }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        // If the response is ok than show the success alert
        alert("reCAPTCHA verification success");
      } else {
        // Else throw an error with the message returned
        // from the API
        const error = await response.json();
        throw new Error(error.message)
      }
    } catch (error) {
      alert("Something went wrong");
    }
  };

  render () {
    return (
      <div className={styles.newRes}>
        <h3>Billing Address</h3>
        <form /*onSubmit={onSubmit}*/>
          <div className={styles.billing}>
            <div className={styles.billingRow}>
              <div className={`${styles.billingCol} ${styles.col50}`}>
                <label><PersonIcon className={styles.label}></PersonIcon>First Name</label>
                <input type="text" defaultValue={this.state.first} onChange={this.handleChange} name="first" placeholder="John" />
              </div>
              <div className={`${styles.billingCol} ${styles.col50}`}>
                <label><PersonIcon className={styles.label}></PersonIcon>Last Name</label>
                <input type="text" defaultValue={this.state.last} onChange={this.handleChange} name="last" placeholder="Doe"/>
              </div>
            </div>
            <br/>
            <div className={styles.billingCol}>
              <div className={`${styles.billingCol} ${styles.fullCol}`}>
                <label><HomeIcon className={styles.label}></HomeIcon>Address Line 1</label>
                <input type="text" defaultValue={this.state.add_1} onChange={this.handleChange} name="add_1" placeholder="1234 Main Street" />
                <br/>
              </div>
              <div className={`${styles.billingCol} ${styles.fullCol}`}>
                <label><HomeIcon className={styles.label}></HomeIcon>Address Line 2</label>
                <input type="text" defaultValue={this.state.add_2} onChange={this.handleChange} name="add_2" placeholder="Apt / Suite / Unit (Optional)" />
                <br/>
              </div>
            </div>
            <div className={styles.billingRow}>
              <div className={`${styles.billingCol} ${styles.leftCol}`}>
                <label className={styles.noIcons}>City</label>
                <input type="text" defaultValue={this.state.city} onChange={this.handleChange} name="city" placeholder="New York City"/>
              </div>
              <div className={`${styles.billingCol} ${styles.col33}`}>
                <label className={styles.noIcons}>State</label>
                <input type="text" defaultValue={this.state.state} onChange={this.handleChange} name="state" placeholder="NY"/>
              </div>
              <div className={`${styles.billingCol} ${styles.rightCol}`}>
                <label className={styles.noIcons}>Zip Code</label>
                <input type="text" defaultValue={this.state.zip} onChange={this.handleChange} name="zip" placeholder="77777"/>
              </div>
            </div>
          </div>
          <br />
          <div className={styles.billing }>
            <h3>Payment Information</h3>
            <p>Accepted Cards</p>
            <div className={styles.cards}>
              <Image
                src="/visa.png"
                alt="credit cards"
                className="map"
                width={100}
                height={100}
              />
              <Image
                src="/discover.png"
                alt="credit cards"
                className="map"
                width={100}
                height={100}
              />
              <Image
                src="/american-express.png"
                alt="credit cards"
                className="map"
                width={100}
                height={100}
              />
              <LockIcon></LockIcon>
            </div>
          <div className={`${styles.billingCol} ${styles.fullCol}`}>
            <label className={styles.noIcons}>Name on Card</label>
            <input type="text" required defaultValue={this.state.full_name} onChange={this.handleChange} name="full_name" placeholder="John M. Doe" />
          </div>
          <br />
          <div className={`${styles.billingCol} ${styles.fullCol}`}>
            <label className={styles.noIcons}>Credit Card Number</label>
            <input type="text" required defaultValue={this.state.cc} onChange={this.handleChange} name="cc" placeholder="5555-8888-0000-1111" />
          </div>
          <br />
          <div className={styles.billingRow}>
            <div className={`${styles.billingCol} ${styles.col50}`}>
              <label className={styles.noIcons}>Expiry Date</label>
              <input type="text" required defaultValue={this.state.expiry} onChange={this.handleChange} name="expiry" placeholder="MM/YY" />
            </div>
            <div className={`${styles.billingCol} ${styles.col50}`}>
              <label className={styles.noIcons}>CVV</label>
              <input type="text" required defaultValue={this.state.cvv} onChange={this.handleChange} name="cvv" placeholder="111" />
            </div>
          </div>
          <br/>
          {/* <button type="submit">CHECKOUT</button> */}
          <form
            method='post'
            action='/api/reCaptcha'
            encType='multipart/form-data'
            onSubmit={event => {
              if (grecaptcha.getResponse() === '') {
                event.preventDefault()
                alert("Please click <I'm not a robot> before sending the job")
              }
            }}
          >
            <div>Testing Area for reCAPTCHA</div>
            <ReCAPTCHA size="normal"
            sitekey="6LcXyJ0jAAAAALIFfxwjIGk0XklRJf5zFFuCcxPt"
            onChange={this.onReCAPTCHAChange}/>
          </form>

          <div className={`${styles.billingCol} ${styles.fullCol}`}>
            <Button color="primary" variant="contained">Checkout</Button>
          </div>
        </div>
      </form>
      </div>
    )
  }
}
export default Payment;