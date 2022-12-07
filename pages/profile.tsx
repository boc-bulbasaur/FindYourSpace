import ProfileButtons from "./profileButtons";
import ProfileAbout from "./profileAbout";

export default function Profile() {
  return (
    <>
      <h1>Profile</h1>
      <ProfileAbout />
      <div className="list">
        <ul>listing 1</ul>
        <ul>listing 2</ul>
      </div>
    </>
  )
}