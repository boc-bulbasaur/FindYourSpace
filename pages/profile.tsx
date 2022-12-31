import ProfileButtons from "../components/profile/profileButtons";
import ProfileAbout from "../components/profile/profileAbout";
import NavBar from "../components/navBar";
import HistoryTable from "../components/history/r_historyTable";
import { createTheme, ThemeProvider } from "@mui/material";
import { useSession } from 'next-auth/react';
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import Link from 'next/link';

const hasHistory = (devToggle: boolean, currentUser: any, profileUser: any) => {
  //Code to check if logged-in user has any past listings with profile user

  return devToggle;
}

export default function Profile() {
  const { data: session, status } = useSession();
  console.log('status', status);
  const router = useRouter();

  const [isBlocked, setIsBlocked] = useState(true);
  const [profileData, setProfileData] = useState(undefined);

  const sampleListings = [
    {id: 11, name: 'Matthew McConaughey', place_id: 'Austin', lat: 30.2711286, lng: -97.7436995,
        address: '123 Alright St', timeRangeStart: '2022-04-25 8:00', timeRangeEnd: '2022-04-25 12:00', rebook: true}
  ]
  let history;
  if (hasHistory(true, '', '')) {
    history =
      <>
        <h3>You have past bookings with this user:</h3>
        <HistoryTable listings={sampleListings}/>
      </>
  }
  const theme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#1b2139',
      },
      secondary: {
        main: '#000000',
      },
      background: {
        default: '#fbfbfb',
      },
    },
    typography: {
      fontFamily: 'Sono',
    },
  });

  useEffect( () => {
    const fetchData = async() => {
      const response = await checkBlock();
      return response;
    }
    fetchData()
    .then((response) => {
      console.log(`is blocked? ${response}`);
      setIsBlocked(response);
    });
  }, []);

  const checkBlock = async () => {
    // return false;
    console.log(session);
    if (!session) {
      console.log('!session');
      return false;
    }
    console.log('checkBlock');
    const isBlocked = await fetch(`/api/isUserBlocked?blocked_user=${session.user.user_id}&user=${router.query.user}`, {
      method: 'GET',
    })
    .then(async (response) => {
      if (response.status === 200) { //200 = block entry found
        return true;
      } else { //404 = no block entry
        const profileResponse = await fetch(`/api/profileData?user=${router.query.user}`, {
          method: 'GET',
        })
        .then(response=>response.json())
        .then(data=> {
          console.log(data);
          setProfileData(data)
        });
        return false;
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
    return isBlocked;
  }



  let blockTest = <>Click <Link href={`/`}>here</Link> to return Home.</>
  if (!isBlocked) {
    blockTest =
      <div className="profile-container">
        <h1>My Profile</h1>
        <ProfileAbout name="testName" profileData={profileData} />
        <ProfileButtons session={session} user={router.query.user}/>
        {history}
      </div>
  }

  return (
     <>
      <NavBar session={session}/>
      <ThemeProvider theme={theme}>
        {blockTest}
      </ThemeProvider>
     </>

  )
}