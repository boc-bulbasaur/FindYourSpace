import NavBar from "../components/navBar"
import DatePicker from "../components/ownerCalendarView"
import O_RenderHistory from "../components/ownerRenderHistory"
import O_RentalList from "../components/ownerRentalList"


export default function OwnerHistory() {
  return (
    <>
      <NavBar />
      <div className="calendar-list-view">
        <DatePicker />
        <O_RentalList />
      </div>
      <O_RenderHistory />
    </>
  )
}