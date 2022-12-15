import React from 'react';
import ProfileButtons from "./profileButtons";
import ProfileTable from './profileTable';
import Avatar from '@mui/material/Avatar';

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
        <Avatar alt="Lemon Santana" src="/static/images/avatar/1.jpg" />
        <h3>About Me</h3>
          {/* Name: {this.state.name}<br />
          Email:{this.state.email}<br />
          Number: {this.state.number}<br />
          About: {this.state.about}<br /> */}

          {/* hardcode just for now */}
          Name: Lemon<br />
          Email: lemon.santana@gmail.com<br />
          Number: 212-123-4567<br />
          About: I live in Austin and am a big fan of concerts. <br />
        <div>Extra Info</div>
        <ProfileButtons />
        <h3>You have 2 past bookings with this User</h3>
        <ProfileTable />
      </div>
    )
  }
}


export default ProfileAbout;