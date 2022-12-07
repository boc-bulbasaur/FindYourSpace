import React from 'react';
import { render } from 'react-dom';
import ProfileButtons from "./profileButtons";
import HistoryTable from './historySummary';

class ProfileAbout extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      email: this.props.email,
      number: this.props.number,
      about: this.props.about
    };

  }

  render() {
    return (
      <div className="About">
        <div>Pic</div>
        <div>About Me</div>
          Name: {this.state.name}<br />
          Email:{this.state.email}<br />
          Number: {this.state.number}<br />
          About: {this.state.about}<br />
        <div>Extra Info</div>
        <ProfileButtons />
        <HistoryTable />
      </div>
    )
  }
}


export default ProfileAbout;