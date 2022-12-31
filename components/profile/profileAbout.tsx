import React from 'react';
import Avatar from '@mui/material/Avatar';

class ProfileAbout extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };

  }

  render() {
    let name, email, number, about;
    if (this.props.profileData !== undefined) {
      name = this.props.profileData[0].name;
      email = this.props.profileData[0].email;
      number = this.props.profileData[0].phoneNumber;
      about = this.props.profileData[0].aboutMe;
    }
    return (
      <div className="About">
        <Avatar alt={name} src="/static/images/avatar/1.jpg" />
        <h3>About Me</h3>
          Name: {name}<br />
          Email:{email}<br />
          Number: {number}<br />
          About: {about}<br />

          {/* hardcode just for now */}
          {/* Name: Matthew<br />
          Email: matthew.mcconaughey@gmail.com<br />
          Number: 512-123-4567<br />
          About: I live in Austin and am a big fan of concerts. <br /> */}
        {/* <div>Extra Info</div> */}
      </div>
    )
  }
}


export default ProfileAbout;