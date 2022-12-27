import React from 'react';
import HistoryTable from '../components/history/r_historyTable';
import dynamic from 'next/dynamic'
import { GridEventListener } from '@mui/x-data-grid';
import { Box, Card, Typography } from '@mui/material';

class RenterHistory extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      listings: [],
      user_id: '',
      currentLoc: [40.7128,-74.0060], //default to NYC
      timeRange: '',
      numListings: ''

    };
    this.handleTableClick = this.handleTableClick.bind(this);
    this.calculateTimeRange = this.calculateTimeRange.bind(this);
  }

  componentDidMount(): void {
    console.log("!!!RENTER HISTORY MOUNT!!!");
    if (this.props.session !== undefined) {
      this.setState({user_id: this.props.session.user.user_id});
    }

    if (this.props.session !== undefined) {
      const getBookings = async () => {
        // const user_id = 3;
        await fetch(`/api/getBookings?user_id=${this.props.session.user.user_id}`, {
          method: 'GET'
        })
        .then((response) => response.json())
        .then((data) => {
          console.log('data', data);
          if (data.warning === undefined) {
            this.setState({
              listings: data,
              currentLoc: [data[0].lat, data[0].lng]
            });
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
      }
      getBookings();
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
    if (this.state.listings.length > 0) {
      const firstLoc = this.state.listings[0];
      this.setState({currentLoc: [firstLoc.lat, firstLoc.lng]});
      this.calculateTimeRange();
    }
  }

  componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<{}>, snapshot?: any): void {
    if (this.state.user_id !== '' && prevState.count !== this.state.counta) {
      console.log('!!!UPDATE!!!');
      const getBookings = async () => {
        // const user_id = 3;
        await fetch(`/api/getBookings?user_id=${this.state.user_id}`, {
          method: 'GET'
        })
        .then((response) => response.json())
        .then((data) => {
          console.log('data', data);
          if (data.warning === undefined) {
            this.setState({
              listings: data,
              currentLoc: [data[0].lat, data[0].lng]
            });
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
      }
      getBookings();
      if (this.state.listings.length > 0) {
        const firstLoc = this.state.listings[0];
        this.setState({currentLoc: [firstLoc.lat, firstLoc.lng]});
        this.calculateTimeRange();
      }
    }
  }

  calculateTimeRange() {
    if (this.state.listings.length === 0) {
      return;
    }
    this.setState({numListings: this.state.listings.length});
    let earliestDT: Date, latestDT: Date;
    if (this.state.listings.length !== undefined) {
      this.state.listings.forEach((e, idx) => {
        if (idx === 0) {
          earliestDT = new Date(e.timeRangeStart);
          latestDT = new Date(e.timeRangeEnd);
        } else {
          const currStartDT = new Date(e.timeRangeStart);
          const currEndDT = new Date(e.timeRangeEnd);
          if (currStartDT < earliestDT) {
            earliestDT = currStartDT;
          }
          if (currEndDT > latestDT) {
            latestDT = currEndDT;
          }
        }
      });
    }
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
    this.setState({currentLoc: [params.row.lat,params.row.lng]});
  };

  render() {
    const LeafMap = dynamic(
      () => import('../components/history/r_historyMap'),
      {
        loading: () => <p>Loading Map...</p>,
        ssr: false
      }
    );
    let timeRange;
    if (this.state.timeRange !== '') {
      timeRange = <Card sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)', padding: 2, margin: 2, width: '50%'}}>
        <Typography variant="h4" component="div">
          Quick stats:
          <Typography sx={{ fontSize: 20 }} color="text.secondary">
            {this.state.numListings} reservations over<br />
            {this.state.timeRange[0]} year(s)<br />
            {this.state.timeRange[1]} day(s)<br />
            {this.state.timeRange[2]} hour(s)
          </Typography>
        </Typography>

        </Card>
    }
    return (
      <>
        <h1>My Rental History</h1>
        <HistoryTable listings={this.state.listings} handleTableClick={this.handleTableClick} />
        {timeRange}
        <Box >Current Position: {}
          <LeafMap position={this.state.currentLoc} />
        </Box>
      </>
    )
  }
}

export default RenterHistory;