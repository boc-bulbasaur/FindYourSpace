import React from 'react';
import { render } from 'react-dom';
import Button from '@mui/material/Button';

class ProfileButtons extends React.Component {

  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.state = {
      blockLabel: 'Block',
      favLabel: 'Favorite'
    };

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
      console.log('API called');
      console.log(data);
    });

    if (e.target.name === 'block') {
      this.setState({blockLabel: 'Blocked'});
    } else if (e.target.name === 'favorite') {
      // e.target.name = 'Added to Favorites';
      this.setState({favLabel: 'Added to Favorites'});
    }
  }

  render() {
    return (
      <>
        <Button variant="contained" onClick={this.handleSubmit} name="favorite" children={this.state.favLabel} sx={{margin: 1}}></Button>
        <Button variant="contained" onClick={this.handleSubmit} name="block" children={this.state.blockLabel}></Button>
      </>
    )
  }
}


export default ProfileButtons;