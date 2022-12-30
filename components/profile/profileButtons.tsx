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

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFavoriteClick = this.handleFavoriteClick.bind(this);
    this.handleBlockClick = this.handleBlockClick.bind(this);
  }

  handleFavoriteClick = async () => {
    const body = {
      user_id: 3,
      blocked_user_id: 7,
    }
    await fetch('/api/favoriteUser', {
      method: 'POST',
      body: JSON.stringify(body),
    })
    .then((response) => {
      if (response.status === 200) {
        console.log('Favorite already exists.', new Date());
      }
      if (response.status === 201) {
        console.log('Success:', response);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  handleBlockClick = async () => {
    const body = {
      user_id: 3,
      blocked_user_id: 2,
    }
    await fetch('/api/blockUser', {
      method: 'POST',
      body: JSON.stringify(body),
    })
    .then((response) => {
      if (response.status === 200) {
        console.log('User already blocked.', new Date());
      }
      if (response.status === 201) {
        console.log('Success:', response);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
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
        <Button variant="contained" onClick={this.handleFavoriteClick} name="favorite" children={this.state.favLabel} sx={{margin: 1}}></Button>
        <Button variant="contained" onClick={this.handleBlockClick} name="block" children={this.state.blockLabel}></Button>
      </>
    )
  }
}


export default ProfileButtons;