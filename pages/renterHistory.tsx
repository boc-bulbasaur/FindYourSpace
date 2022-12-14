import ProfileButtons from "../components/profile/profileButtons";
import ProfileAbout from "../components/profile/profileAbout";
import NavBar from "../components/navBar";
import HistoryTable from '../components/history/r_historyTable';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import dynamic from 'next/dynamic'

export default function RenterHistory() {
  const LeafMap = dynamic(
    () => import('../components/history/r_historyMap'),
    {
      loading: () => <p>A map is loading</p>,
      ssr: false
    }
  )
  return (
    <>
      <NavBar />
      <h1>My Rental History</h1>
      <h3>Past Rentals</h3>
      <HistoryTable />
      <h3>Map:</h3>
      <LeafMap />
    </>
  )
}