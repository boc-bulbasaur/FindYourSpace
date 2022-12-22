import * as React from 'react';
import { useState } from 'react';
import NavBar from "../components/navBar";
import OwnerHistory from "./ownerHistoryDash";
import RenterHistory from "./renterHistory";
import HistoryToggle from "../components/history/historyToggle";
// MUI default Robot font
import styles from '../styles/history.module.css';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useSession } from 'next-auth/react';

export default function History() {
  const { data: session } = useSession();
  console.log(session);

  const [owner, setToggle] = useState(false);

  const handleToggle = (event: React.MouseEvent<HTMLElement>,
    selection: string) => {
    // setState({toggle: selection});
    setToggle(!owner);
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
      fontFamily: ['Sono','sans-serif'].join(',')
    },
  });
  let history;
  if (!owner) {
    history = <RenterHistory />
  } else {
    history = <OwnerHistory />
  }
  return (
    <ThemeProvider theme={theme} >
      <NavBar session={session}/>
        {/* Note the modular CSS below */}
        <div className={styles.history}>
          <HistoryToggle handleToggle={handleToggle} sx={{color: 'black'}}/>
          {history}
        </div>
      </ThemeProvider>
  );

}