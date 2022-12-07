import React from 'react';
import { render } from 'react-dom';
import Button from '@mui/material/Button';

class ProfileButtons extends React.Component {

  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.state = {};

    this.buttonClick = this.buttonClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  buttonClick = (e: any) => {
    e.preventDefault();
    console.log(e.target.name);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const postData = async () => {
      const data = {
        block: '',
        favorite: ''
      };
      if (e.target.name === 'block') {
        data.block = 'username';
      } else if (e.target.name === 'favorite') {
        data.favorite = 'username';
      }

      const response = await fetch("/api/profile", {
        method: "POST",
        body: JSON.stringify(data),
      });
      return response.json();
    };
    postData().then((data) => {
      console.log(data);
    });
  }

  render() {
    return (
      <>
        <Button variant="contained" onClick={this.handleSubmit} name="favorite">Favorite</Button>
        <Button variant="contained" onClick={this.handleSubmit} name="block">Block</Button>
      </>
    )
  }
}


export default ProfileButtons;