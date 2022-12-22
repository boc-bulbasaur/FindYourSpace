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

export default function ForgotPassword() {
  const { data: session } = useSession();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [emailHelper, setEmailHelper] = useState('');
  const [message, setMessage] = useState('');
  const [disabledButton, setDisabledButton ] = useState(true);

  const handleEmailChange = (e) => {
    if (emailError) {
      setEmailError(false);
    }
    setEmail(e.target.value);
    if (email.length && email.indexOf('@') !== -1) {
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
  const handleResetPassword = async () => {
    if (email.indexOf('@') !== -1) {
      await fetch('/api/password-reset-email', {
        method: 'POST',
        body: email,
      })
      .then((response) => {
        setMessage('Please check your email for the reset password link.');
        setEmail('');
      })
      .catch((error) => {
        setMessage('An error has occurred. If the problem persists, please contact us.')
        console.error('Error:', error);
      });
    }
  }

  return (
    <>
      <NavBar session={session}/>
      <Container maxW="xl" centerContent>
        <Heading as="h1" textAlign="center" marginTop={50}>
          Let&apos;s reset your password.
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
            <Typography color={'error'} textAlign="center" sx={{ m: 1.2 }}>{message}</Typography>
            <Button
              type="submit"
              variant="contained"
              sx={{ p: 1, m: 1 }}
              onClick={handleResetPassword}
              disabled={disabledButton}
            >
              Send Password Reset Link
            </Button>
            <Typography color={'primary'} textAlign="center" margin={1}><Link href='/login'>Go back to log in</Link></Typography>
          </Box>
        </Box>
      </Container>
    </>
  );
}