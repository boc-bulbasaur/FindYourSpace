import { format, formatDistance, formatRelative, subDays } from 'date-fns'
import * as React from 'react';
import {useState, useFetch} from 'react';

import NavBar from "../components/navBar"
import { ThemeProvider, createTheme } from "@mui/material";
import DatePicker from "../components/ownerCalendarView"
import O_MonthlyBreakdown from "../components/ownerMonthlyBreakdown"
import O_RenderHistory from "../components/ownerRenderHistory"
import O_RentalList from "../components/ownerRentalList"
import styles from '../styles/ownerHistoryDash.module.css';
import handler from '/api/ownerHistory.ts';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import router from 'next/router';

export default function OwnerHistory( props ) {
  //console.log('Main History Dashboard props: ', props);
  const { data: session, status } = useSession();
  useEffect(()=>{
    if (status === 'unauthenticated') {
      router.push('/');
    }
  });
  console.log('status', status);
  console.log('session', session);
  const [date, setDate] = useState();

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

 const liftDate = (reformattedDate) => {
  let newDate = reformattedDate;
  setDate(newDate);
  //console.log('date hook: ', newDate)
 }
 if (status === 'authenticated') {
  return (
    <ThemeProvider theme={theme}>
      <NavBar session={undefined} />
      <div className={styles.owner_top_container}>
        <DatePicker liftDate={liftDate} dates={props.dates}/>
        <O_RentalList ownerHistory={props.userHistory} newDate={date}/>
        <O_MonthlyBreakdown total={props.total}/>
      </div>
      <O_RenderHistory  ownerHistory={props} />
    </ThemeProvider>
  )
} else {
  return (<></>)
}
}

export async function getServerSideProps() {

  const response = await fetch(`http://localhost:3000/api/ownerHistory`);
  const data = await response.json();

  let total = 0;
  let dates: number[] = [];

  data.forEach((entry) => {
    total += entry.short_term_rate;
    let newDate = new Date(entry.start_time);
    dates.push(newDate.getDate())
  })

  return {
    props: {
      userHistory: data,
      total,
      dates
    },
  }
}