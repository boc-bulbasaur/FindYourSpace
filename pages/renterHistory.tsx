import React from 'react';
import NavBar from "../components/navBar";
import HistoryTable from '../components/history/r_historyTable';
import dynamic from 'next/dynamic'
import { GridEventListener } from '@mui/x-data-grid';

class RenterHistory extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      listings: [
        {id: 11, firstName: 'Matthew', lastName: 'McConaughey', place_id: 'Austin', lat: 30.2711286, lng: -97.7436995,
        address: '123 Alright St', timeRangeStart: '2022-04-25 8:00', timeRangeEnd: '2022-04-25 12:00'},
        {id: 12, firstName: 'Dexter', lastName: 'Morgan', place_id: 'Miami', lat: 25.781681, lng: -80.211788,
        address: '777 Tropicana Dr', detail: 'Spot #7', timeRangeStart: '2022-07-04 12:00', timeRangeEnd: '2022-07-05 12:00'},
      ],
      userId: 100,
      currentLoc: [40.7128,-74.0060]
    };
    this.handleTableClick = this.handleTableClick.bind(this);
  }

  componentDidMount(): void {

  }

  handleTableClick: GridEventListener<'rowClick'> = (
    params, // GridRowParams
    event, // MuiEvent<React.MouseEvent<HTMLElement>>
    details, // GridCallbackDetails
  ) => {
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
        <NavBar />
        <h1>My Rental History</h1>
        <h3>Past Rentals</h3>
        <HistoryTable listings={this.state.listings} handleTableClick={this.handleTableClick}/>
        <h3>Map:</h3>
        <LeafMap position={this.state.currentLoc} />
      </>
    )
  }
}

export default RenterHistory;