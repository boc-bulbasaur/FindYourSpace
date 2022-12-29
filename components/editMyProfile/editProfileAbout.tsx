import React from 'react';
import HistoryTable from '../components/history/r_historyTable';
import dynamic from 'next/dynamic'
import { GridEventListener } from '@mui/x-data-grid';
import { Box, Card, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';

class editProfileAbout extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      number: '',
      aboutMe: '',
    };
    this.getUsername = this.getUsername.bind(this);
  }

  componentDidMount(): void {
    console.log("mount user name here!!");
    console.log('get username -log session', this.props.session);

    if (this.props.session !== undefined) {
      this.getUsername(this.props.session.user.user_id);
    }
  }

  componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<{}>, snapshot?: any): void {
  }

  getUsername = async (user_id) => {
    // const user_id = 3;
    console.log(`GET username FOR USER ${user_id}`);
    await fetch(`/api/editProfile?user_id=${user_id}`, {
      method: 'GET'
    })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log('log data here', data);
      this.setState({
        name: data["name"],
        email: data["email"],
        number: data["phoneNumber"],
        aboutMe: data["aboutMe"],
      });
    })
    //.then(response => console.log(JSON.stringify(response)))
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  render() {
    return (
      <div className="About">
        <Avatar alt="Justo Marquez" src="/static/images/avatar/1.jpg" />
        <h3>About Me</h3>
        <form action="/send-data-here" method="post">
          <label>Name:</label>
          <input type="text" name="name" value={this.state.name}/>
          <br />
          <label>Email:</label>
          <input type="text" name="email" value={this.state.email}/>
          <br />
          <label>Number:</label>
          <input type="text" name="number" value={this.state.number}/>
          <br />
          <label>About me:</label>
          <input type="text" name="aboutMe" value={this.state.aboutMe}/>
          <br />
          <button type="submit">Save Profile</button>
        </form>
      </div>
    )
  }
}

// <HistoryTable listings={this.state.listings} handleTableClick={this.handleTableClick} />

export default editProfileAbout;