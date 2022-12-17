import React from 'react';
import Map from '../map';

class Booking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render () {
    return (
      <div>
        <h3>1234 USA Street, Sunnyvale, CA, 94560</h3>
        <h3>12/10/2023 10:30:00AM - 12/10/2023 02:30:00PM</h3>
      </div>
    )
  }
}

export default Booking;