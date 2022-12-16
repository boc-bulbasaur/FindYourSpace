import ProfileButtons from "../components/profile/profileButtons";
import ProfileAbout from "../components/profile/profileAbout";
import NavBar from "../components/navBar";
import HistoryTable from "../components/history/r_historyTable";

const hasHistory = (currentUser: any, profileUser: any) => {
  //Code to check if logged-in user has any past listings with profile user

  return true;
}

export default function Profile(props) {
  let history;
  if (hasHistory('currentUser', 'profileuser')) {
    history =
      <>
        <h3>You have past bookings with this user:</h3>
        <HistoryTable listings={[]}/>
      </>
  }
  return (
    <>
      <NavBar />
      <div className="profile-container">
        <h1>Profile</h1>
        <ProfileAbout name="testName"/>
        <ProfileButtons />
        {history}
      </div>
    </>
  )
}