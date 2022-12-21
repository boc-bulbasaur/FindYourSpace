import React, { useState } from "react";
import Router from 'next/router';
import NavBar from "../components/navBar";
import { signIn, useSession, getSession, getProviders, getCsrfToken } from "next-auth/react";
import utils from '../../../lib/crypto.js';
import Link from 'next/link';
import {
  Box,
  Heading,
  Input,
  Container,
} from "@chakra-ui/react";
import { Button, TextField, Typography, } from '@mui/material';
import { setSyntheticTrailingComments } from "typescript";

export default function Signup() {
  const { data: session } = useSession();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [emailHelper, setEmailHelper] = useState('');
  const [password, setPassword] = useState('');
  const [passwordHelper, setPasswordHelper] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [disabledButton, setDisabledButton ] = useState(true);
  const [message, setMessage] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleEmailBlur = () => {
    if (email.length > 4 && email.indexOf('@') === -1) {
      console.log('Please enter a valid email address');
      setEmailHelper('Please enter a valid email address');
      setEmailError(true);
      setDisabledButton(true);
    }
    else {
      setEmailHelper('');
      setEmailError(false);
    }
  };
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
    if (email.length && name.length && password.length && password === e.target.value) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  };
  const handleSubmit = async (e) => {
    if (email.length && name.length && password.length && password === confirmPassword) {
      const credentials = {
        name,
        email,
        password,
      }
      await fetch('/api/signup', {
        method: 'POST',
        body: JSON.stringify(credentials),
      })
      .then((response) => {
        if (response.status === 422) {
          console.log('User already exists.', new Date());
          setMessage('User with that email cannot be created.');
          setEmail('');
          setEmailError(true);
          throw new Error;
        }
        if (response.status === 201) {
          console.log('Success:', response);
          setMessage('User created! Please check your email.');
          setName('');
          setEmail('');
          setPassword('');
          setConfirmPassword('');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    }
  }

  return (
    <>
      <NavBar session={session}/>
      <Container maxW="xl" centerContent>
        <Heading as="h1" textAlign="center" marginTop={50}>
          Let&apos;s get you started
        </Heading>
        <Box
          alignContent="center"
          justifyContent="center"
          marginTop={20}
          backgroundColor={'white'}
          sx={{ p: 30, width: 400 }}
        >
          <Box margin={8} display={'flex'} flexDirection={'column'} justifyContent={'space-evenly'} alignItems={'stretch'}>
            <Button variant="contained" onClick={() => signIn('google', { callbackUrl: 'http://localhost:3000/'})}>
            Continue with Google
            </Button>
            <Typography color={'black'} textAlign="center" margin={2}>or</Typography>
            <TextField
              id="name"
              label="Name"
              variant="outlined"
              type="text"
              value={name}
              required={true}
              error={false}
              sx={{ p: 1.2 }}
              onChange={handleNameChange}
            />
            <TextField
              id="email"
              label="Email"
              variant="outlined"
              type="email"
              value={email}
              required={true}
              error={emailError}
              helperText={emailHelper}
              sx={{ p: 1.2 }}
              onChange={handleEmailChange}
              onBlur={handleEmailBlur}
            />
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
              onClick={handleSubmit}
              disabled={disabledButton}
            >
              Sign up
            </Button>
            <Typography color={'black'} textAlign="center" marginTop={3}>Already have an account?</Typography>
            <Typography color={'primary'} textAlign="center" margin={1}><Link href='/login'>Log in</Link></Typography>
          </Box>
        </Box>
      </Container>
    </>
  );
}

Signup.getInitialProps = async (context) => {
  const { req, res } = context;
  const session = await getSession({ req });

  if (session) {
    res.writeHead(301, {
      Location: '/',
    });
    res.end();
    return;
  }
  return {
    session: undefined,
  };
};