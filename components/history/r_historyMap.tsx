import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const icon = L.icon({ iconUrl: "/images/leaflet/marker-icon.png" });

class HistoryMap extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    //Defaulted for now to Austin,TX
    var position = this.props.position;
    return (
      <MapContainer center={position} zoom={13} scrollWheelZoom={true} style={{height: 600, width: 800}}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={icon}>
          <Popup>hola!</Popup>
        </Marker>
      </MapContainer>
    )
  }
}

export default HistoryMap;