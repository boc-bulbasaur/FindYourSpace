import React, { useState } from "react";
import NavBar from "../components/navBar";
import { signIn, useSession, getSession, getProviders, getCsrfToken } from "next-auth/react";
import utils from '../../../lib/crypto.js';
import client from '../../../database/db.js';
import Link from 'next/link';
import {
  Box,
  Heading,
  Input,
  Container,
} from "@chakra-ui/react";
import { Button, TextField, Typography, } from '@mui/material';

export default function Signup() {
  const { data: session } = useSession();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };
  const handleSubmit = (e) => {
    client.query(`SELECT * FROM users WHERE email = ${email}`, (err, res) => {
      if (res.rows[0]) {

      }
    })
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
              id="email"
              label="Email"
              variant="outlined"
              required={false}
              error={false}
              sx={{ p: 1.5 }}
              onChange={handleEmailChange}
            />
            <TextField
              id="password1"
              label="Password"
              type="password"
              variant="outlined"
              error={false}
              helperText={''}
              sx={{ p: 1.5 }}
              onChange={handlePasswordChange}
            />
            <TextField
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              variant="outlined"
              error={false}
              helperText={''}
              sx={{ p: 1.5 }}
              onChange={handleConfirmPasswordChange}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{ p: 1, m: 1 }}
              onClick={() => {
                signIn('credentials', { email, password, callbackUrl: 'http://localhost:3000/'});
              }}
            >
              Log In
            </Button>
            <Typography color={'primary'} textAlign="center" marginTop={3}>Already have an account?</Typography>
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