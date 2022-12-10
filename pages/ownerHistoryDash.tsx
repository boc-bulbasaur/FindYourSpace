import NavBar from "../components/navBar"
import O_RenderHistory from "../components/ownerRenderHistory"
import DatePicker from "../components/ownerCalendarView"

export default function OwnerHistory() {
  return (
    <>
      <NavBar />
      <DatePicker />
      <O_RenderHistory />
    </>
  )
}