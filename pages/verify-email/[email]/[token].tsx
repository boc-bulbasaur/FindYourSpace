import React, { useState } from 'react';
import {
  Box,
  Heading,
  Container,
} from "@chakra-ui/react";
import client from '../../../database/db.js';
import { Button, Typography, } from '@mui/material';
import Link from 'next/link';

export default function EmailVerification({ email, isVerified }) {
  const [message, setMessage] = useState('Your link is invalid or may have expired.');

  const handleNewLink = async () => {
    await fetch('/api/resend-verification-email', {
      method: 'POST',
      body: email,
    })
    .then((response) => {
      if (response.status === 200) {
        setMessage('Verification link resent. Please check your email.');
      }
      if (response.status === 500 || response.status === 422) {
        setMessage('An error has occurred. If this problem perists please contact us.');
      }
    })
  };
  if (isVerified === null) {
    return (
      <Container maxW="xl" centerContent>
        <Heading as="h1" textAlign="center" marginTop={50}>
          Verifying your email...
        </Heading>
        <Box
          alignContent="center"
          justifyContent="center"
          marginTop={20}
          backgroundColor={'white'}
          sx={{ p: 30, width: 400 }}
        >
          <Box margin={8} display={'flex'} flexDirection={'column'} justifyContent={'space-evenly'} alignItems={'stretch'}>
            <Typography color={'error'} textAlign="center" sx={{ m: 1.2 }}>One moment please...</Typography>
            <Typography color={'primary'} textAlign="center" margin={1}><Link href='/login'>Go back to log in</Link></Typography>
          </Box>
        </Box>
      </Container>
    )
  }
  if (isVerified === false) {
    return (
      <Container maxW="xl" centerContent>
        <Heading as="h1" textAlign="center" marginTop={50}>
          Email verification.
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
              Send New Link
            </Button>
            <Typography color={'primary'} textAlign="center" margin={1}><Link href='/login'>Go back to log in</Link></Typography>
          </Box>
        </Box>
      </Container>
    );
  }
};

export async function getServerSideProps({ query, res }) {
  const email = decodeURIComponent(query.email);
  const { token } = query;
  const isVerified = await client.query(`SELECT * FROM users WHERE email = $1 AND token = $2`,
  [email, token]).then(async (result) => {
      const user = result.rows[0];
      if (!user || new Date() > user.token_expires.getTime()) {
        return false;
      } else {
        const { rows } = await client.query(`UPDATE users SET is_verified = $1
        WHERE email = $2 AND token = $3 RETURNING *`,[true, email, token]
        );
        const updatedUser = rows[0];
        console.log('updatedUser:', updatedUser);
        if (updatedUser && updatedUser.is_verified) {
          console.log('Success updating');
          res.writeHead(301, {
            Location: '/login',
          });
          res.end();
          return true;
        } else {
          return false;
        }
      }
    }).catch((err) => {
      console.log('Error!', err);
      if (err) {
        return false;
      }
    });
  return {
    props: {
      email,
      isVerified
    }
  };
};