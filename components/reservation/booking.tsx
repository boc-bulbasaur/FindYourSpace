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
      ev: true,
      gated: true,
      attended: true,
      clearance: true,
      available: true,
      info: ''
    }
  }

  componentDidMount () {
    fetch(`/api/getListing?listing_id=${this.props.listing}`, {
      method: 'POST'
    })
      .then((results) => {
        this.setState({
          address: results.address,
          description: results.description,
          garage: results.garage,
          ev: results.electric_charger,
          gated: results.gated,
          attended: results.attended,
          clearance: results.high_clearance,
          available: results.always_available,
          info: results.special_information
        })
      })
      .catch(err => {
        console.log(err);
      })
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
            <div className={styles.parkIcons}>
              <div>{this.state.garage === true ? <div><GarageIcon></GarageIcon><p>This parking spot is in a garage</p></div> : <p style={{visibility:'hidden'}}>&#x00AB;</p>}</div>
              <div>{this.state.ev === true ? <div><EvStationIcon></EvStationIcon><p>This parking spot has EV charging</p></div> : <p style={{visibility:'hidden'}}>&#x00AB;</p>}</div>
              <div>{this.state.gated === true ? <div><FenceIcon></FenceIcon><p>This parking spot is gated</p></div> : <p style={{visibility:'hidden'}}>&#x00AB;</p>}</div>
              <div>{this.state.attended === true ? <div><Person4Icon></Person4Icon><p>This parking spot is attended</p></div> : <p style={{visibility:'hidden'}}>&#x00AB;</p>}</div>
              <div>{this.state.clearance === true ? <div><HeightIcon></HeightIcon><p>This parking spot has high clearance</p></div> : <p style={{visibility:'hidden'}}>&#x00AB;</p>}</div>
              <div>{this.state.available === true ? <div><TimelapseIcon></TimelapseIcon><p>This parking spot is available 24/7</p></div> : <p style={{visibility:'hidden'}}>&#x00AB;</p>}</div>
            </div>
          </div>
          <p className={styles.parkDetails}>{this.state.info}</p>
        </div>
      </div>
    )
  }
}

export default Booking;