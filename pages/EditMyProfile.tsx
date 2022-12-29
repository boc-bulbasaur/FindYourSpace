import ProfileAbout from "../components/profile/profileAbout";
import NavBar from "../components/navBar";
import { createTheme, ThemeProvider } from "@mui/material";
import { useSession } from 'next-auth/react';


export default function EditMyProfile() {
  const { data: session, status } = useSession();
  console.log('status', status);
  console.log('session', session);

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

  return (
     <>
      <ThemeProvider theme={theme}>
        <NavBar session={session}/>
        <div className="profile-container">
          <h1>Edit your Profile</h1>
          <ProfileAbout name="testName"/>
        </div>
      </ThemeProvider>
     </>

  )
}