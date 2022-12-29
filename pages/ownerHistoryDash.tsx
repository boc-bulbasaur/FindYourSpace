import { format, formatDistance, formatRelative, subDays } from 'date-fns'
import * as React from 'react';
import {useState} from 'react';

import NavBar from "../components/navBar"
import { ThemeProvider, createTheme } from "@mui/material";
import DatePicker from "../components/ownerCalendarView"
import O_MonthlyBreakdown from "../components/ownerMonthlyBreakdown"
import O_RenderHistory from "../components/ownerRenderHistory"
import O_RentalList from "../components/ownerRentalList"
import styles from '../styles/ownerHistoryDash.module.css';
import handler from '/api/ownerHistory.ts';

export default function OwnerHistory( props ) {
  //console.log('Main History Dashboard props: ', props)

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
      <NavBar session={undefined} />
      <div className={styles.owner_top_container}>
        <DatePicker dates={props.dates}/>
        <O_RentalList />
        <O_MonthlyBreakdown total={props.total}/>
      </div>
      <O_RenderHistory  ownerHistory={props} />
    </ThemeProvider>
  )
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