import ProfileButtons from "../components/profileButtons";
import ProfileAbout from "../components/profileAbout";

export default function Profile() {
  return (
    <>
      <h1>Profile</h1>
      <ProfileAbout name="testName"/>
      <div className="list">
        <ul>listing 1</ul>
        <ul>listing 2</ul>
      </div>
    </>
  )
}