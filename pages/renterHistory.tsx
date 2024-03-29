import React from 'react';
import HistoryTable from '../components/history/r_historyTable';
import ImgMediaCard from '../components/history/r_historyCard';
import dynamic from 'next/dynamic'
import { GridEventListener } from '@mui/x-data-grid';
import { Box, Card, Typography } from '@mui/material';
import styles from '../styles/history.module.css';

class RenterHistory extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      listings: [],
      currentLoc: [40.7128,-74.0060], //default to NYC
      timeRange: '',
      numListings: '',
      currentListing: {}
    };
    this.handleTableClick = this.handleTableClick.bind(this);
    this.calculateTimeRange = this.calculateTimeRange.bind(this);
  }

  componentDidMount(): void {
    console.log("!!!RENTER HISTORY MOUNT!!!");
    if (this.props.session !== undefined) {
      this.getBookings(this.props.session.user.user_id);
    } else {
      this.setState({listings:
        [
          // {id: 11, name: 'Matthew McConaughey', place_id: 'Austin, TX', lat: 30.3111286, lng: -97.7336995,
          // address: '123 Alright St', timeRangeStart: '2022-04-25 8:00', timeRangeEnd: '2022-04-25 12:00', rebook: true},
          // {id: 102, name: 'Dexter Morgan', place_id: 'Miami, FL', lat: 25.781681, lng: -80.211788,
          // address: '777 Tropicana Dr', detail: 'Spot #7', timeRangeStart: '2022-07-04 12:00', timeRangeEnd: '2022-07-05 12:00', rebook: false},
          // {id: 131, name: 'Steve Rogers', place_id: 'Sunnyvale, CA', lat: 37.3688, lng: -122.0563,
          // address: '1234 USA St', detail: 'This parking spot is streetside parking. Please only park directly in front of the house addressed.', timeRangeStart: '2023-12-10 10:30', timeRangeEnd: '2023-12-10 14:30', rebook: true}
        ]
      });
    }
  }

  componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<{}>, snapshot?: any): void {
    // if (this.state.user_id !== '' && prevState.count !== this.state.count) {
    //   console.log('!!!UPDATE!!!');
    //   this.getBookings();
    //   if (this.state.listings.length > 0) {
    //     const firstLoc = this.state.listings[0];
    //     this.setState({currentLoc: [firstLoc.lat, firstLoc.lng]});
    //     this.calculateTimeRange();
    //   }
    // }
  }

  getBookings = async (user_id) => {
    // const user_id = 3;
    console.log(`GETBOOKINGS FOR USER ${user_id}`);
    await fetch(`/api/getBookings?user_id=${user_id}`, {
      method: 'GET'
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.warning === undefined) {
        this.setState({
          listings: data,
          numListings: data.length,
          currentLoc: [data[0].lat, data[0].lng]
        });
        this.calculateTimeRange(data);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  calculateTimeRange(data: any) {
    console.log('CALCULATING TIME RANGE');
    if (data.length === 0) {
      return;
    }
    let earliestDT: Date, latestDT: Date;
    data.forEach((e, idx) => {
      if (idx === 0) {
        earliestDT = new Date(e.start_time);
        latestDT = new Date(e.end_time);
      } else {
        const currStartDT = new Date(e.start_time);
        const currEndDT = new Date(e.end_time);
        if (currStartDT < earliestDT) {
          earliestDT = currStartDT;
        }
        if (currEndDT > latestDT) {
          latestDT = currEndDT;
        }
      }
    });

    //Calculate and return difference in hours
    var diff = (latestDT.getTime() - earliestDT.getTime()) / 1000;
    diff /= (60 * 60);
    const totalHours = Math.abs(Math.round(diff));
    const days = Math.floor(totalHours/24);
    const years = Math.floor(days/365);
    const hours = totalHours % 24;
    this.setState({timeRange: [years, days, hours]});
  }

  handleTableClick: GridEventListener<'rowClick'> = (
    params, // GridRowParams
    event, // MuiEvent<React.MouseEvent<HTMLElement>>
    details, // GridCallbackDetails
  ) => {
    event.preventDefault();
    console.log(params.row);
    this.setState({
      currentLoc: [params.row.lat,params.row.lng],
      currentListing: params.row
    });
  };

  render() {
    const LeafMap = dynamic(
      () => import('../components/history/r_historyMap'),
      {
        loading: () => <p>Loading Map...</p>,
        ssr: false
      }
    );
    let timeRange, mediaCard;
    if (this.state.timeRange !== '') {
      timeRange = <Card sx={{ mx: '2px', transform: 'scale(0.8)', padding: 2, margin: 2, border: 'groove', borderWidth: '10px'}}>
        <Typography variant="h4" component="div">
          At a Glance:
          <Typography sx={{ fontSize: 20 }} color="text.secondary">
            {this.state.numListings} reservations over<br />
            {this.state.timeRange[0]} year(s)<br />
            {this.state.timeRange[1]} day(s)<br />
            {this.state.timeRange[2]} hour(s)
          </Typography>
        </Typography>

        </Card>
    }
    if (Object.keys(this.state.currentListing).length !== 0) {
      mediaCard = <ImgMediaCard currentListing={this.state.currentListing}/>
    }
    return (
      <>
        <h1>My Rental History</h1>
        <div className={styles.historyTable}>
          <HistoryTable listings={this.state.listings} handleTableClick={this.handleTableClick} />
        </div>
        <div className={styles.historySummary}>
          {timeRange}
          {mediaCard}
        </div>
        {/* <Box > */}
          <h2>Current Selection:</h2>
          <LeafMap position={this.state.currentLoc} />
        {/* </Box> */}
      </>
    )
  }
}

export default RenterHistory;