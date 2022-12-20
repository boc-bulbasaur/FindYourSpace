import { format, formatDistance, formatRelative, subDays } from 'date-fns'

import NavBar from "../components/navBar"
import { ThemeProvider, createTheme } from "@mui/material";
import DatePicker from "../components/ownerCalendarView"
import O_MonthlyBreakdown from "../components/ownerMonthlyBreakdown"
import O_RenderHistory from "../components/ownerRenderHistory"
import O_RentalList from "../components/ownerRentalList"
import styles from '../styles/ownerHistoryDash.module.css';

export default function OwnerHistory( props ) {
  console.log('Main History Dashboard props: ', props)

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

  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      <div className={styles.calendar_list_view}>
        <DatePicker />
        <O_RentalList />
        <O_MonthlyBreakdown />
      </div>
      <O_RenderHistory  ownerHistory={props} />
    </ThemeProvider>
  )
}

export async function getServerSideProps() {

  const rows = [
    { id: '0AE7C96D', fullName: 'Justo Marquez', startDateTime: '2022-04-20 8:00', endDateTime: '2022-04-20 12:00', duration: null, location: '1234 Example st', total: '$32.00', block: true },
    { id: 'B46D307D', fullName: 'Keren Liu', startDateTime: '2022-04-22 9:00', endDateTime: '2022-04-22 14:00', duration: null, location: '1234 Example st', total: '$40.00', block: null },
    { id: 'F368C178', fullName: 'Eric Kalin', startDateTime: '2022-04-25 8:00', endDateTime: '2022-04-25 9:00', duration: null, location: '1234 Example st', total: '$10.00', block: null },
    { id: 'C4A07C54', fullName: 'Keith Hall', startDateTime: '2022-04-26 12:00', endDateTime: '2022-04-26 13:00', duration: null, location: '1234 Example st', total: '$10.00', block: null },
    { id: '0D984B84', fullName: 'Zefeng Shen', startDateTime: '2022-04-29 8:00', endDateTime: '2022-04-29 16:00', duration: null, location: '1234 Example st', total: '$55.00', block: null },
    { id: '28F54014', fullName: 'Miranda Zhou', startDateTime: '2022-04-23 11:00', endDateTime: '2022-04-23 17:00', duration: null, location: '1234 Example st', total: '$45.00', block: null },
    { id: 'CC34D0F9', fullName: 'Jewell Wilson', startDateTime: '2022-04-25 8:00', endDateTime: '2022-04-25 12:00', duration: null, location: '1234 Example st', total: '$25.00', block: null },
    { id: '49B6F40D', fullName: 'JT Liu', startDateTime: '2022-04-25 8:00', endDateTime: '2022-04-25 12:00', duration: null, location: '1234 Example st', total: '$25.00', block: null },
  ];

  return {
    props: {
      userHistory: rows,
    },
  }
}