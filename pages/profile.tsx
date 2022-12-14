import ProfileButtons from "../components/profile/profileButtons";
import ProfileAbout from "../components/profile/profileAbout";
import NavBar from "../components/navBar";

export default function Profile() {
  return (
    <>
      <NavBar />
      <h1>Profile</h1>
      <ProfileAbout name="testName"/>
      <div className="list">
        <ul>listing 1</ul>
        <ul>listing 2</ul>
      </div>
    </>
  )
}