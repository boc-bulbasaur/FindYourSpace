import ProfileButtons from "../components/profile/profileButtons";
import ProfileAbout from "../components/profile/profileAbout";
import NavBar from "../components/navBar";
import ProfileTable from "../components/profile/profileTable";

export default function Profile() {
  return (
    <>
      <NavBar />
      <h1>Profile</h1>
      <ProfileAbout name="testName"/>
      <ProfileButtons />
      <h3>You have past bookings with this User:</h3>
      <ProfileTable />
    </>
  )
}