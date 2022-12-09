import ProfileButtons from "../components/profileButtons";
import ProfileAbout from "../components/profileAbout";
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