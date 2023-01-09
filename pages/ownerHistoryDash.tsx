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

class RenterHistory extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      ownerHistory: [],
      rentalDates: [],
      selectedDate: '',
      occupency: '',
      month: '',
      total: 0,
    };
    this.liftDate = this.liftDate.bind(this);
    this.liftMonth = this.liftMonth.bind(this);
    this.toggleBlock = this.toggleBlock.bind(this);
    this.removeRecord = this.removeRecord.bind(this);

  }


  async componentDidMount() {

    const response = await fetch(`http://localhost:3000/api/ownerHistory`)
    const json = await response.json();

    let total = 0;
    let dates: number[] = [];

    json.forEach((entry) => {
      total += entry.short_term_rate;
      let newDate = new Date(entry.start_time);
      dates.push(newDate.getDate())
    })

      this.setState({
        ownerHistory: json,
        rentalDates: dates,
        total: total,
      })

  }

  liftDate(reformattedDate) {
    let newDate = reformattedDate;
    this.setState({selectedDate: newDate});
   }

   liftMonth(newMonth) {
    let selectedMonth = newMonth;
    this.setState({month: selectedMonth})
   }

   toggleBlock(e) {
    let userId = e.id;
    this.setState(prevState => {
      ownerHistory: prevState.ownerHistory.map( el => el.id === userId? {...el, block: true} : el)
    })
   }

   removeRecord(id) {
    // let filtered = [];

    // this.state.ownerHistory.forEach((item) => {
    //   if (item.id !== id) {
    //     filtered.push(item)
    //   }
    // })
    // console.log('id: ', id)
    // console.log('state: ', this.state.ownerHistory)
    // this.setState({ownerHistory: filtered, total: 491, occupency: '24%'})
    console.log('id: ', id)
    fetch('/api/deleteBooking', {
      method: 'DELETE',
      body: id
    })
      .then(async () => {
        console.log('Successfully deleted');
        const response = await fetch(`http://localhost:3000/api/ownerHistory`)
        const json = await response.json();
        this.setState({
          ownerHistory: json
        })
      })
      .catch((err) => {
        console.log('error: ', err)
        console.error(err);
      });
   }

   render() {
    //console.log('top level state: ', this.state)

      const theme = createTheme({
        palette: {
          mode: 'dark',
          primary: {
            main: '#1b2139',
            dark: '#c9c9ce',
          },
          secondary: {
            main: '#000000',
          },
        },
        typography: {
          fontFamily: ['Sono','sans-serif'].join(',')
        },
      });

      if (this.state.rentalDates.length === 0 || this.state.ownerHistory.length === 0) {
        return <div />;
      }

    return (
          <>
            {/* <NavBar session={undefined} /> */}
            <ThemeProvider theme={theme} >
              <div className={styles.owner_top_container}>
                <DatePicker liftDate={this.liftDate} liftMonth={this.liftMonth} dates={this.state.rentalDates}/>
                <O_RentalList ownerHistory={this.state.ownerHistory} newDate={this.state.selectedDate} removeRecord={this.removeRecord}/>
                <O_MonthlyBreakdown total={this.state.total} date={this.state.month} occupency={this.state.occupency}/>
              </div>
              <O_RenderHistory  ownerHistory={this.state.ownerHistory} toggleBlock={this.toggleBlock}/>
            </ThemeProvider>
          </>
        )

   }

}

export default RenterHistory;



// import { format, formatDistance, formatRelative, subDays } from 'date-fns'
// import * as React from 'react';
// import {useState, useFetch} from 'react';

// import NavBar from "../components/navBar"
// import { ThemeProvider, createTheme } from "@mui/material";
// import DatePicker from "../components/ownerCalendarView"
// import O_MonthlyBreakdown from "../components/ownerMonthlyBreakdown"
// import O_RenderHistory from "../components/ownerRenderHistory"
// import O_RentalList from "../components/ownerRentalList"
// import styles from '../styles/ownerHistoryDash.module.css';
// import handler from '/api/ownerHistory.ts';

// export default function OwnerHistory( props ) {
//   //console.log('Main History Dashboard props: ', props)
//   const [date, setDate] = useState();
//   const [storage, setStorage] = useState();

//   const theme = createTheme({
//     palette: {
//       mode: 'light',
//       primary: {
//         main: '#1b2139',
//       },
//       secondary: {
//         main: '#000000',
//       },
//       background: {
//         default: '#fbfbfb',
//       },
//     },
//     typography: {
//       fontFamily: ['Sono','sans-serif'].join(',')
//     },
//   });

//  const liftDate = (reformattedDate) => {
//   let newDate = reformattedDate;
//   setDate(newDate);
//   //console.log('date hook: ', newDate)
//  }

//  const liftMonth = (newMonth) => {
//   let month = newMonth;
//   console.log('new month: ', month);
//  }

//   return (
//     <ThemeProvider theme={theme}>
//       <NavBar session={undefined} />
//       <div className={styles.owner_top_container}>
//         <DatePicker liftDate={liftDate} liftMonth={liftMonth} dates={props.dates}/>
//         <O_RentalList ownerHistory={props.userHistory} newDate={date}/>
//         <O_MonthlyBreakdown total={props.total}/>
//       </div>
//       <O_RenderHistory  ownerHistory={props} />
//     </ThemeProvider>
//   )
// }

// export async function getServerSideProps() {


//   const response = await fetch(`http://localhost:3000/api/ownerHistory`);
//   const data = await response.json();

//   console.log('serverside Data: ', data)

//   let total = 0;
//   let dates: number[] = [];

//   data.forEach((entry) => {
//     total += entry.short_term_rate;
//     let newDate = new Date(entry.start_time);
//     dates.push(newDate.getDate())
//   })

//   return {
//     props: {
//       userHistory: data,
//       total,
//       dates,
//     },
//   }
// }