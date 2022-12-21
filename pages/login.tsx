import React, { useState } from "react";
import router from 'next/router';
import NavBar from "../components/navBar";
import { signIn, useSession, getSession, getProviders, getCsrfToken } from "next-auth/react";
import Link from 'next/link';
import {
  Box,
  Heading,
  Container,
} from "@chakra-ui/react";
import { Button, TextField, Typography, } from '@mui/material';
import { PasswordOutlined } from "@mui/icons-material";

export default function LogIn() {
  const { data: session } = useSession();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [emailHelper, setEmailHelper] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [message, setMessage] = useState('');
  const [disabledButton, setDisabledButton ] = useState(true);

  const handleEmailChange = (e) => {
    if (emailError) {
      setEmailError(false);
    }
    setEmail(e.target.value);
    if (password.length && email.length && email.indexOf('@') !== -1) {
      setDisabledButton(false);
      setEmailHelper('');
      setEmailError(false);
    } else {
      setDisabledButton(true);
    }
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
    if (passwordError) {
      setPasswordError(false);
    }
    if (e.target.value.length && email.length) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  };
  const handleCredentialsSubmit = async () => {
    signIn('credentials', { email, password, redirect: false})
      .then(({ error }) => {
        if (error) {
          setEmail('');
          setEmailError(true);
          setPassword('');
          setPasswordError(true);
          setMessage('You have either entered invalid credentials or your email has not been validated.');
        } else {
          router.push('/');
        }
      })
  }

  return (
    <>
      <NavBar session={session}/>
      <Container maxW="xl" centerContent>
        <Heading as="h1" textAlign="center" marginTop={50}>
          Log in to your account
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
              id="email"
              label="Email"
              variant="outlined"
              value={email}
              required={true}
              error={emailError}
              onBlur={handleEmailBlur}
              helperText={emailHelper}
              sx={{ p: 1.5 }}
              onChange={handleEmailChange}
            />
            <TextField
              id="password"
              label="Password"
              type="password"
              variant="outlined"
              value={password}
              required={true}
              error={passwordError}
              helperText={''}
              autoComplete="current-password"
              sx={{ p: 1.5 }}
              onChange={handlePasswordChange}
            />
            <Typography color={'error'} textAlign="center" sx={{ m: 1.2 }}>{message}</Typography>
            <Button
              type="submit"
              variant="contained"
              sx={{ p: 1, m: 1 }}
              onClick={handleCredentialsSubmit}
              disabled={disabledButton}
            >
              Log In
            </Button>
            <Typography color={'primary'} textAlign="center" marginTop={3}><Link href='/forgot-password'>Forgot password?</Link></Typography>
            <Typography color={'primary'} textAlign="center" margin={1}><Link href='/signup'>Create an account</Link></Typography>
          </Box>
        </Box>
      </Container>
    </>
  );
}

LogIn.getInitialProps = async ({ req, res }) => {
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