import React from 'react';
import NavBar from "../components/navBar";
import HistoryTable from '../components/history/r_historyTable';
import dynamic from 'next/dynamic'

class RenterHistory extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      listings: [
        {id: 1, firstName: 'Stevie', lastName: 'Ray Vaughan', place_id: 'Austin', lat: 30.2711286, lng: -97.7436995,
        address: '123 Anywhere St', timeRangeStart: '2022-04-25 8:00', timeRangeEnd: '2022-04-25 12:00'},
        {id: 2, firstName: 'Dexter', lastName: 'Morgan', place_id: 'Miami', lat: 25.761681, lng: -80.191788,
        address: '777 Tropicana Dr', detail: 'spot #7', timeRangeStart: '2022-04-25 8:00', timeRangeEnd: '2022-04-25 12:00'},
      ],
      userId: 100
    };
  }

  componentDidMount(): void {

  }

  render() {
    const LeafMap = dynamic(
      () => import('../components/history/r_historyMap'),
      {
        loading: () => <p>A map is loading</p>,
        ssr: false
      }
    );
    return (
      <>
        <NavBar />
        <h1>My Rental History</h1>
        <h3>Past Rentals</h3>
        <HistoryTable listings={this.state.listings}/>
        <h3>Map:</h3>
        <LeafMap listings={this.state.listings} />
      </>
    )
  }
}

export default RenterHistory;