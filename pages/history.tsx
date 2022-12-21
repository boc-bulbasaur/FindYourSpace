import * as React from 'react';
import NavBar from "../components/navBar";
import OwnerHistory from "./ownerHistoryDash";
import RenterHistory from "./renterHistory";
import HistoryToggle from "../components/history/historyToggle";
// MUI default Robot font
import styles from '../styles/history.module.css';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Palette } from '@mui/icons-material';
import { dark } from '@mui/material/styles/createPalette';

class History extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      rentAndOwn: false,
      toggle: 'renter'
    };

    this.handleToggle = this.handleToggle.bind(this);
  }

  componentDidMount(): void {
    //code to query if current user is renter AND owner
    //if true set this.state.rentAndOwn
  }

  handleToggle(event: React.MouseEvent<HTMLElement>,
    selection: string,): void {
    this.setState({toggle: selection});
  }

  render() {
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
    if (this.state.toggle === 'renter') {
      history = <RenterHistory />
    } else if (this.state.toggle === 'owner') {
      history = <OwnerHistory />
    }
    return (
      <>
        <ThemeProvider theme={theme} >
        <NavBar />


          {/* Note the modular CSS below */}
          <div className={styles.history}>
            <HistoryToggle handleToggle={this.handleToggle} sx={{color: 'black'}}/>
            {history}
          </div>
        </ThemeProvider>
      </>
    )
  }
}

export default History;