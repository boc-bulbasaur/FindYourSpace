import React from 'react';
import { render } from 'react-dom';
import Button from '@mui/material/Button';

class ProfileButtons extends React.Component {

  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.state = {
      blockLabel: 'Block',
      favLabel: 'Favorite',
      profileUser: 3
    };

    this.handleFavoriteClick = this.handleFavoriteClick.bind(this);
    this.handleBlockClick = this.handleBlockClick.bind(this);
  }

  handleFavoriteClick = async (e: any, userToFav: any) => {
    const body = {
      user_id: this.state.currUser,
      fav_user_id: userToFav,
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

  handleBlockClick = async (e: any, userToBlock: any) => {
    const currUser = this.props.session.user.user_id; //currUser = user from session
    const body = {
      user_id: currUser,
      blocked_user_id: userToBlock,
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

  render() {
    return (
      <>
        <Button variant="contained" user={this.props.user} onClick={(e) => this.handleFavoriteClick(e, this.state.profileUser)} name="favorite" children={this.state.favLabel} sx={{margin: 1}}></Button>
        <Button variant="contained" user={this.props.user} onClick={(e) => this.handleBlockClick(e, this.state.profileUser)} name="block" children={this.state.blockLabel}></Button>
      </>
    )
  }
}


export default ProfileButtons;