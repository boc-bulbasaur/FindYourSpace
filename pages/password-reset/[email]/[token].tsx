import React, { useState }  from 'react';
import router from 'next/router';
import {
  Box,
  Heading,
  Input,
  Container,
} from "@chakra-ui/react";
import { Button, TextField, Typography, } from '@mui/material';
import { signIn } from "next-auth/react";
import utils from '../../../lib/crypto.js';
import client from '../../../database/db.js';

export default function PasswordReset({ email, validToken, token }) {
  const [message, setMessage] = useState('');
  const [password, setPassword] = useState('');
  const [passwordHelper, setPasswordHelper] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [disabledButton, setDisabledButton ] = useState(true);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (e.target.value > 5) {
      setPasswordHelper('Password must contain at least 8 lowercase and uppercase letters, numbers, and symbols.');
    }
  };
  const handlePasswordBlur = () => {
    if (password.length < 8) {
      setPasswordHelper('Password must contain at least 8 lowercase and uppercase letters, numbers, and symbols.');
      setPasswordError(true);
      setDisabledButton(true);
    }
    else {
      setPasswordHelper('');
      setPasswordError(false);
    }
  };
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (password.length && password === e.target.value) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  };
  const handleResetPassword = async () => {
    const credentials = {
      email,
      password,
      token
    };
    await fetch('/api/update-password', {
      method: 'POST',
      body: JSON.stringify(credentials),
    })
    .then((response) => {
      if (response.status === 200) {
        console.log('Success:', response);
        signIn('credentials', { email, password, callbackUrl: 'http://localhost:3000/'});
      }
    })
    .catch((error) => {
      setMessage('An error has occurred. If the problem persists, please contact us.')
      console.error('Error:', error);
    });
  };
  const handleNewLink = async () => {
    await fetch('/api/password-reset-email', {
      method: 'POST',
      body: email,
    })
    .then((response) => {
      setMessage('Please check your email for the reset password link.');
    })
    .catch((error) => {
      setMessage('An error has occurred. If the problem persists, please contact us.')
      console.error('Error:', error);
    });
  }

  if (validToken) {
    return (
      <Container maxW="xl" centerContent>
        <Heading as="h1" textAlign="center" marginTop={50}>
          Please create a new password.
        </Heading>
        <Box
          alignContent="center"
          justifyContent="center"
          marginTop={20}
          backgroundColor={'white'}
          sx={{ p: 30, width: 400 }}
        >
          <Box margin={8} display={'flex'} flexDirection={'column'} justifyContent={'space-evenly'} alignItems={'stretch'}>
          <TextField
              id="password1"
              label="Password"
              type="password"
              variant="outlined"
              value={password}
              required={true}
              error={false}
              helperText={passwordHelper}
              sx={{ p: 1.2 }}
              onChange={handlePasswordChange}
              onBlur={handlePasswordBlur}
            />
            <TextField
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              variant="outlined"
              value={confirmPassword}
              required={true}
              error={false}
              helperText={''}
              sx={{ p: 1.2 }}
              onChange={handleConfirmPasswordChange}
            />
            <Typography color={'error'} textAlign="center" sx={{ m: 1.2 }}>{message}</Typography>
            <Button
              type="submit"
              variant="contained"
              sx={{ p: 1, m: 1 }}
              onClick={handleResetPassword}
              disabled={disabledButton}
            >
              Reset Password
            </Button>
          </Box>
        </Box>
      </Container>
    );
  } else {
    return (
      <Container maxW="xl" centerContent>
        <Heading as="h1" textAlign="center" marginTop={50}>
          Link is invalid or may have expired.
        </Heading>
        <Box
          alignContent="center"
          justifyContent="center"
          marginTop={20}
          backgroundColor={'white'}
          sx={{ p: 30, width: 400 }}
        >
          <Box margin={8} display={'flex'} flexDirection={'column'} justifyContent={'space-evenly'} alignItems={'stretch'}>
            <Typography color={'error'} textAlign="center" sx={{ m: 1.2 }}>{message}</Typography>
            <Button
              type="submit"
              variant="contained"
              sx={{ p: 1, m: 1 }}
              onClick={handleNewLink}
            >
              Send a new link
            </Button>
          </Box>
        </Box>
      </Container>
    );
  }
};

export async function getServerSideProps({ query, req, res }) {
  const email = decodeURIComponent(query.email);
  const { token } = query;
  const validToken = await client.query(`SELECT * FROM users WHERE email = $1 AND token = $2`,
  [email, token]).then(async (result) => {
      const user = result.rows[0];
      if (!user || new Date() > user.token_expires.getTime()) {
        return false;
      } else {
        return true;
      }
    }).catch((err) => {
      if (err) {
        console.log(err);
        return false;
      }
    });
  return {
    props: {
      email,
      validToken,
      token
    }
  };
};