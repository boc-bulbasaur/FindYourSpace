import React from 'react';
import HistoryTable from '../components/history/r_historyTable';
import dynamic from 'next/dynamic'
import { GridEventListener } from '@mui/x-data-grid';

class RenterHistory extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      listings: [
        {id: 11, name: 'Matthew McConaughey', place_id: 'Austin', lat: 30.2711286, lng: -97.7436995,
        address: '123 Alright St', timeRangeStart: '2022-04-25 8:00', timeRangeEnd: '2022-04-25 12:00', rebook: true},
        {id: 12, name: 'Dexter Morgan', place_id: 'Miami', lat: 25.781681, lng: -80.211788,
        address: '777 Tropicana Dr', detail: 'Spot #7', timeRangeStart: '2022-07-04 12:00', timeRangeEnd: '2022-07-05 12:00', rebook: false},
      ],
      userId: 100,
      currentLoc: [40.7128,-74.0060],
      timeRange: '',
      numListings: ''

    };
    this.handleTableClick = this.handleTableClick.bind(this);
    this.calculateTimeRange = this.calculateTimeRange.bind(this);
  }

  componentDidMount(): void {

    this.calculateTimeRange();
  }

  calculateTimeRange() {
    this.setState({numListings: this.state.listings.length});
    let earliestDT: Date, latestDT: Date;
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
    //Calculate and return difference in hours
    var diff =(latestDT.getTime() - earliestDT.getTime()) / 1000;
    diff /= (60 * 60);
    var totalHours = Math.abs(Math.round(diff));
    var days = Math.floor(totalHours/24);
    var hours = totalHours % 24;
    this.setState({timeRange: `Time diff: ${days} days and ${hours} hours`});
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
    return (
      <>
        <h1>My Rental History</h1>
        <HistoryTable listings={this.state.listings} handleTableClick={this.handleTableClick} />
        <LeafMap position={this.state.currentLoc} />
      </>
    )
  }
}

export default RenterHistory;