import ProfileButtons from "../components/profileButtons";
import ProfileAbout from "../components/profileAbout";
import NavBar from "../components/navBar";
import { useSession, getSession } from "next-auth/react";

export default function Profile() {
  const { data: session } = useSession();
  return (
    <>
      <NavBar session={session}/>
      <h1>Profile</h1>
      <ProfileAbout name="testName"/>
      <div className="list">
        <ul>listing 1</ul>
        <ul>listing 2</ul>
      </div>
    </>
  )
}