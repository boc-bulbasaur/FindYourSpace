import React from 'react';
import Image from 'next/image';
import Map from '../map';
import styles from '../../styles/reservation.module.css';

class Booking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      startTime: '',
      endTime: '',
      price: '',
      description: ''
    }
  }

  render () {
    return (
      <div>
        <h3>{this.props.address}</h3>
        <h3>{this.props.start} - {this.props.end}</h3>
        <div className={styles.price}>
          <div className={styles.details}>
            <Image
              src="/../public/map.png"
              alt="map"
              className="map"
              width={350}
              height={250}
            />
            <p className={styles.parkDetails}>This parking spot is streetside parking. Please only park directly in front of the house addressed.</p>
          </div>
            <h4 className="right-price">$8.00 / hr X 4 Hours</h4>
            <hr className={styles.horLine}/>
            <h4 className="right-price">Total Price: $32.00</h4>
          </div>
        </div>
    )
  }
}

export default Booking;