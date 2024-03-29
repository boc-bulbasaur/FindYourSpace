import * as React from 'react';
import { useState } from 'react';
import NavBar from "../components/navBar";
import OwnerHistory from "./ownerHistoryDash";
import RenterHistory from "./renterHistory";
import HistoryToggle from "../components/history/historyToggle";
// MUI default Robot font
import styles from '../styles/history.module.css';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import router from 'next/router';
// import '../styles/history.module.css';

export default function History() {
  const { data: session, status } = useSession();
  useEffect(()=>{
    if (status === 'unauthenticated') {
      router.push('/');
    }
  });
  console.log('status', status);
  console.log('session', session);

  const [owner, setToggle] = useState(false);

  const handleToggle = (event: React.MouseEvent<HTMLElement>,
    selection: string) => {
    // setState({toggle: selection});
    setToggle(!owner);
  }

  const theme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#0724a6',
        dark: '#c9c9ce',
      },
      secondary: {
        main: '#000000',
      },
    },
    typography: {
      fontFamily: ['Sono','sans-serif'].join(',')
    },
    // palette: {
    //   mode: 'dark',
    //   primary: {
    //     main: '#000000',
    //   },
    //   secondary: {
    //     main: '#1b2139',
    //   },
    //   background: {
    //     default: '#fbfbfb',
    //   },
    // },
    // typography: {
    //   fontFamily: ['Sono','sans-serif'].join(',')
    // },
  });
  let history;
  if (!owner) {
    history = <div className={styles.renterMain}><RenterHistory session={session}/></div>
  } else {
    history = <OwnerHistory session={session}/>
  }
  if (status === 'authenticated') {
    return (
      <div>
        <NavBar session={session}/>
        <ThemeProvider theme={theme} >
          <div className={styles.historyToggle} >
            <HistoryToggle handleToggle={handleToggle} sx={{color: 'white'}}/>
          </div>
          {history}
        </ThemeProvider>
      </div>
    );
  } else {
    return (<></>)
  }


}