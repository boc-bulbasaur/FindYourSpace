import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { LatLngLiteral } from 'leaflet';

class HistoryMap extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    //Defaulted for now to Austin,TX
    var position = [30.2711286, -97.7436995];
    if (Object.entries(this.props.listings).length !== 0) {
      const entryOne = this.props.listings[0];
      console.log(`props lat and long [${entryOne.lat},${entryOne.lng}]`)
      position = [entryOne.lat,entryOne.lng];
    }
    return (
      <MapContainer center={position} zoom={13} scrollWheelZoom={true} style={{height: 600, width: 800}}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    )
  }
}

export default HistoryMap;