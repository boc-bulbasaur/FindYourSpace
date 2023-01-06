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
  useEffect(()=>{
    if (status === 'unauthenticated') {
      router.push('/');
    }
  });

  const refreshData = () => {
    router.replace(router.asPath);
  }

  const [isBlocked, setIsBlocked] = useState(true);
  const [profileData, setProfileData] = useState(undefined);

  const sampleListings = [
    {id: 11, name: 'Keren Liu', lat: 30.2711286, lng: -97.7436995,
        address: '117 Spring St, Elizabeth, NJ 07201', start_time: '2022-12-31T10:30:00.602Z', end_time: '2022-12-31T20:30:00.602Z', rebook: true}
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
        console.log(`getting profile of user ${router.query.user}`);
        const profileResponse = await fetch(`/api/profileData?user=${router.query.user}`, {
          method: 'GET',
        })
        .then(response=>response.json())
        .then(data=> {
          console.log(data);
          setProfileData(data);
          //refreshData();
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
      <div className="profile-container" style={{ padding: 25 }}>
        <h1>My Profile</h1>
        <ProfileAbout name="testName" profileData={profileData} />
        <ProfileButtons session={session} user={router.query.user}/>
        {history}
      </div>
  }
  if (status === 'authenticated') {
    return (
      <>
        <NavBar session={session}/>
        <ThemeProvider theme={theme}>
          {blockTest}
        </ThemeProvider>
       </>
   )
  } else {
    return (<></>)
  }
}