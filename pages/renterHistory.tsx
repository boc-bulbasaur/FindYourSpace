import ProfileButtons from "../components/profile/profileButtons";
import ProfileAbout from "../components/profile/profileAbout";
import NavBar from "../components/navBar";
import HistoryTable from '../components/historyTable';


export default function RenterHistory() {
  return (
    <>
      <NavBar />
      <h1>My Rental History</h1>
      <h3>Past Rentals</h3>
      <HistoryTable />
      <h3>Map of City of selected row goes here</h3>
    </>
  )
}