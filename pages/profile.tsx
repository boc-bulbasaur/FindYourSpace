import ProfileButtons from "../components/profileButtons";
import ProfileAbout from "../components/profileAbout";
import NavBar from "../components/navBar";
import { getSession } from "next-auth/react";

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

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
    if (!session) {
      return {
        redirect: {
          destination: '/'
        }
      }
    }
  //Put in the rest of your serverSideProps logic here.
  return {
    //Leave session in the returned props.
    props: {session},
  }
}