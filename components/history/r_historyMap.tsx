import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

//Defaulted for now to Austin,TX
const position = [30.2711286, -97.7436995];

export default function HistoryMap() {
  return (
    <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{height: 600, width: 800}}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  )
}