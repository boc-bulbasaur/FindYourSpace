import React from 'react';
import HistoryTable from '../components/history/r_historyTable';
import dynamic from 'next/dynamic'
import { GridEventListener } from '@mui/x-data-grid';
import { Box, Card, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';

class editProfileAbout extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      number: '',
      aboutMe: '',
    };
    this.getMyProfile = this.getMyProfile.bind(this);
    this.onChangeAboutMe = this.onChangeAboutMe.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(): void {
    console.log("mount user name here!!");
    console.log('get username -log session', this.props.session);

    if (this.props.session !== undefined) {
      this.getMyProfile(this.props.session.user.user_id);
    }
  }

  componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<{}>, snapshot?: any): void {
  }

  getMyProfile = async (user_id) => {
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
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  onChangeAboutMe(event) {
    this.setState({
      aboutMe: event.target.value
    });
  }

  handleSubmit = async (event, user_id) => {
    event.preventDefault();
    console.log('PUT-testing on handlesubmit');
    // let user_id = this.props.session.user.user_id
    const data = {
      aboutMe: this.state.aboutMe} ;
    console.log('PUT request log data here', data);

    await fetch(`/api/editProfile`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log('log put request data here', data);
      // this.setState({
      //   aboutMe: data["aboutMe"],
      // });
      alert('Your profile is successfully updated.');
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  render() {
    return (
      <div className="About">
        <Avatar alt={this.state.name} src="/static/images/avatar/1.jpg" />
        <h3>About Me</h3>
          <tr>
            <th><label>Name:</label></th>
            <th>
              <input type="text" name="name" value={this.state.name} readOnly={true}/>
            </th>
          </tr>

          <tr>
            <th>
            <label>Email:</label>
            </th>
            <th>
            <input type="text" name="email" value={this.state.email} readOnly={true}/>
            </th>
          </tr>

          <tr>
            <th>
            <label>Number:</label>
            </th>
            <th>
            <input type="text" name="number" value={this.state.number} readOnly={true}/>
            </th>
          </tr>

          <tr>
            <th>
            <label>About me:</label>
            </th>
            <th>
            <input type="text" name="aboutMe" value={this.state.aboutMe} onChange={(e) => this.onChangeAboutMe(e)}/>
            </th>
          </tr>

        <form onSubmit={this.handleSubmit}>
          <button type="submit" style={{marginTop: '35px'}}>Save Profile</button>
        </form>
      </div>
    )
  }
}

// <HistoryTable listings={this.state.listings} handleTableClick={this.handleTableClick} />

export default editProfileAbout;