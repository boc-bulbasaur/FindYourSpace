import React from 'react';
import Image from 'next/image';
import Map from '../map';
import styles from '../../styles/reservation.module.css';
import GarageIcon from '@mui/icons-material/Garage';
import AddRoadIcon from '@mui/icons-material/AddRoad';
import RoofingIcon from '@mui/icons-material/Roofing';
import EvStationIcon from '@mui/icons-material/EvStation';
import FenceIcon from '@mui/icons-material/Fence';
import Person4Icon from '@mui/icons-material/Person4';
import HeightIcon from '@mui/icons-material/Height';

class Booking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      startTime: '',
      endTime: '',
      price: '',
      description: '',
      garage: true,
      streetside: true,
      covered: true,
      ev: true,
      gated: true,
      attended: true,
      clearance: true
    }
  }

  render () {
    return (
      <div>
        <h3>1234 USA Street, Sunnyvale, CA, 94560</h3>
        <h3>12/10/2023 10:30:00AM - 12/10/2023 02:30:00PM</h3>
        <div className={styles.price}>
          <div className={styles.details}>
            <Image
              src="/../public/map.png"
              alt="map"
              className="map"
              width={350}
              height={250}
            />
            <div className={styles.parkIcons}>
              <GarageIcon></GarageIcon><p>This parking spot is in a garage</p>
              <AddRoadIcon></AddRoadIcon><p>This parking spot is streetside</p>
              <RoofingIcon></RoofingIcon><p>This parking spot is covered</p>
              <EvStationIcon></EvStationIcon><p>This parking spot has EV charging</p>
              <FenceIcon></FenceIcon><p>This parking spot is gated</p>
              <Person4Icon></Person4Icon><p>This parking spot is attended</p>
              <HeightIcon></HeightIcon><p>This parking spot has low clearance</p>
            </div>
          </div>
          <p className={styles.parkDetails}>Extra details provided by the owner</p>

        </div>
      </div>
    )
  }
}

export default Booking;