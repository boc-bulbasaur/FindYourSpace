import React from 'react';
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
        <Avatar alt="Matthew McConaughey" src="/static/images/avatar/1.jpg" />
        <h3>About Me</h3>
          {/* Name: {this.state.name}<br />
          Email:{this.state.email}<br />
          Number: {this.state.number}<br />
          About: {this.state.about}<br /> */}

          {/* hardcode just for now */}
          Name: Matthew<br />
          Email: matthew.mcconaughey@gmail.com<br />
          Number: 512-123-4567<br />
          About: I live in Austin and am a big fan of concerts. <br />
        <div>Extra Info</div>
      </div>
    )
  }
}


export default ProfileAbout;