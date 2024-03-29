import EditProfileAbout from "../components/editMyProfile/editProfileAbout";
import NavBar from "../components/navBar";
import { createTheme, ThemeProvider } from "@mui/material";
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import router from 'next/router';


export default function EditMyProfile() {
  const { data: session, status } = useSession();
  useEffect(()=>{
    if (status === 'unauthenticated') {
      router.push('/');
    }
  });
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

  if (status === 'authenticated') {
    return (
      <>
       <NavBar session={session}/>
       <ThemeProvider theme={theme}>
       <div className="profile-container"
       style={{ padding: 25 }}>


           <h1>Edit your Profile</h1>
           <EditProfileAbout session={session} />
         </div>
       </ThemeProvider>
      </>
   )
  } else {
    return (<></>)
  }

}