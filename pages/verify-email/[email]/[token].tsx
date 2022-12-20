import React from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Heading,
  Input,
  Container,
} from "@chakra-ui/react";
import { signIn } from "next-auth/react";
// import utils from '../../lib/crypto.js';
import client from '../../../database/db.js';

export default function EmailVerification({ email, isVerified }) {
  console.log('first step', email, isVerified);
  const [loading, setLoading] = React.useState(false);

  const handleNewLink = () => {
    //FILL ME IN
  };

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
          {!isVerified && <Typography color={'error'} textAlign="center" sx={{ m: 1.2 }}>Your link is invalid or may have expired.</Typography>}
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
};

export async function getServerSideProps({ query, req, res }) {
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