import * as React from 'react';
import NavBar from "../components/navBar";
import OwnerHistory from "./ownerHistoryDash";
import RenterHistory from "./renterHistory";
import HistoryToggle from "../components/history/historyToggle";

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
  }

  handleToggle(event: React.MouseEvent<HTMLElement>,
    selection: string,): void {
    console.log('toggle clicked');
    console.log(selection);
    this.setState({toggle: selection});
  }

  render() {
    let history;
    if (this.state.toggle === 'renter') {
      history = <RenterHistory />
    } else if (this.state.toggle === 'owner') {
      history = <OwnerHistory />
    }
    return (
      <>
        <NavBar />
        <div className="history-container">
          <HistoryToggle handleToggle={this.handleToggle}/>
          {history}
        </div>
      </>
    )
  }
}

export default History;