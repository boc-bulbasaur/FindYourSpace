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
import TimelapseIcon from '@mui/icons-material/Timelapse';
import config from './config';

class Booking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      startTime: '',
      endTime: '',
      price: '',
      description: 'This spot has it all',
      garage: true,
      ev: true,
      gated: true,
      attended: false,
      clearance: true,
      available: false,
      info: 'Gate code is 8321'
    }
  }

  componentDidMount () {
    // fetch(`/api/getListing?listing=${this.props.listing}`, {
    //   method: 'GET'
    // })
    //   .then((results) => {
    //     console.log("get", results.body);
    //     this.setState({
    //       address: results.address,
    //       description: results.description,
    //       garage: results.garage,
    //       ev: results.electric_charger,
    //       gated: results.gated,
    //       attended: results.attended,
    //       clearance: results.high_clearance,
    //       available: results.always_available,
    //       info: results.special_information
    //     })
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   })
  }

  render () {
    return (
      <div>
        <h3>{this.props.address}</h3>
        <h3>{this.props.start} - {this.props.end}</h3>
        <div className={styles.price}>
          <div className={styles.details}>
            <Image
              src={`https://maps.googleapis.com/maps/api/staticmap?center=3210+Grand+Avenue%2C+Phoenix%2C+Az%2C+USA&zoom=7&scale=2&size=350x250&maptype=roadmap&format=png&key=AIzaSyBQN_j5grb1Zt4kj1avpZ_zteCinE2o8m0&markers=size:mid%7Ccolor:0x472e5c%7Clabel:1%7C3210%20Grand%20Avenue%2C%20Phoenix%2C%20Az%2C%20USA`}
              alt="map"
              className="map"
              width="350"
              height="250"
            />
          </div>
          <div className={styles.parkIcons}>
              <div className={styles.iconD}>{this.state.garage === true ? <div><GarageIcon></GarageIcon><p>This parking spot is in a garage</p></div> : <p style={{visibility:'hidden'}}>&#x00AB;</p>}</div>
              <div className={styles.iconD}>{this.state.ev === true ? <div><EvStationIcon></EvStationIcon><p>This parking spot has EV charging</p></div> : <p style={{visibility:'hidden'}}>&#x00AB;</p>}</div>
              <div className={styles.iconD}>{this.state.gated === true ? <div><FenceIcon></FenceIcon><p>This parking spot is gated</p></div> : <p style={{visibility:'hidden'}}>&#x00AB;</p>}</div>
              <div className={styles.iconD}>{this.state.attended === true ? <div><Person4Icon></Person4Icon><p>This parking spot is attended</p></div> : <p style={{visibility:'hidden'}}>&#x00AB;</p>}</div>
              <div className={styles.iconD}>{this.state.clearance === true ? <div><HeightIcon></HeightIcon><p>This parking spot has high clearance</p></div> : <p style={{visibility:'hidden'}}>&#x00AB;</p>}</div>
              <div className={styles.iconD}>{this.state.available === true ? <div><TimelapseIcon></TimelapseIcon><p>This parking spot is available 24/7</p></div> : <p style={{visibility:'hidden'}}>&#x00AB;</p>}</div>
            </div>
          <p className={styles.parkDetails}>{this.state.description}</p>
        </div>
      </div>
    )
  }
}

export default Booking;