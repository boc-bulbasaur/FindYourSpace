import React, { useState } from "react";
import NavBar from "../components/navBar";
import { signIn, useSession, getSession, getProviders, getCsrfToken } from "next-auth/react";
import Link from 'next/link';
import {
  Box,
  Heading,
  Input,
  Container,
} from "@chakra-ui/react";
import { Button, TextField, Typography, } from '@mui/material';

export default function LogIn() {
  const { data: session } = useSession();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

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
              required={false}
              error={false}
              sx={{ p: 1.5 }}
              onChange={handleEmailChange}
            />
            <TextField
              id="password"
              label="Password"
              type="password"
              variant="outlined"
              error={false}
              helperText={''}
              autoComplete="current-password"
              sx={{ p: 1.5 }}
              onChange={handlePasswordChange}
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
            <Typography color={'primary'} textAlign="center" marginTop={3}>Forgot password?</Typography>
            <Typography color={'primary'} textAlign="center" margin={1}><Link href='/signup'>Create an account</Link></Typography>
          </Box>
        </Box>
      </Container>
    </>
  );
}

LogIn.getInitialProps = async (context) => {
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