import ProfileButtons from "../components/profile/profileButtons";
import ProfileAbout from "../components/profile/profileAbout";
import NavBar from "../components/navBar";
import HistoryTable from "../components/history/r_historyTable";
import { createTheme, ThemeProvider } from "@mui/material";
import { useSession } from 'next-auth/react';
import { useEffect } from "react";
import { useRouter } from 'next/router'

const hasHistory = (devToggle: boolean, currentUser: any, profileUser: any) => {
  //Code to check if logged-in user has any past listings with profile user

  return devToggle;
}

export default function Profile() {
  const { data: session, status } = useSession();
  console.log('status', status);
  console.log('session', session);
  const router = useRouter();

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

  useEffect(() => {
    checkBlock();
  });

  const checkBlock = async () => {
    if (!session) {
      return;
    }
    console.log('!!!checkBlock!!!');

    await fetch(`/api/isUserBlocked?user=${session.user.user_id}&blocked_user=${router.query.user}`, {
      method: 'GET',
    })
    .then((response) => {
      console.log(response.status);
      if (response.status === 200) {
        return true;
      } else {
        return false;
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  return (
     <>
      <ThemeProvider theme={theme}>
        <NavBar session={session}/>
        <div className="profile-container">
          <h1>Profile</h1>
          <ProfileAbout name="testName"/>
          <ProfileButtons session={session}/>
          {history}
        </div>
      </ThemeProvider>
     </>

  )
}