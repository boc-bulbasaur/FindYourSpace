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
  console.log(email, isVerified);
  const [loading, setLoading] = React.useState(false);

  const handleNewLink = () => {};

  return (
    <>
      <Container maxW="xl" centerContent>
      <Heading as="h1" textAlign="center" marginTop={50}>
        Verifying email...{isVerified ? 'email confirmed' : 'error'}
      </Heading>
      </Container>
    </>
  );
  // try {
  //   const { rows } = await client.query(`SELECT * FROM users WHERE email = '${email}'`);
  //   const user = rows[0];
  //   if (user !== undefined) {
  //     res.status(422).send();
  //   } else {
  //     const salt = await utils.createRandom32String();
  //     password = await utils.createHash(password, salt);
  //     const hash = await utils.createRandom32String();
  //     const registered_at = new Date();
  //     const expires = new Date(registered_at.getTime() + 1000 * 60 * 60 * 24);
  //     const values = [name, email, password, salt, registered_at, expires, hash];
  //     await client.query(`INSERT INTO users
  //       (name, email, password, salt, registered_at, expires, hash)
  //       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING user_id`,
  //       values)
  //       .then((result) => {
  //         //SEND EMAIL LINK
  //         console.log(result.rows);
  //         res.status(201).send(result.rows[0].userid);
  //       });
  //   }
  // } catch (err) {
  //   res.status(500).send(err);
  // }
};

export async function getServerSideProps({ query, req, res }) {
  const email = decodeURIComponent(query.email);
  const { hash } = query;
  const isVerified = await client.query(`SELECT * FROM users WHERE email = $1 AND hash = $2`,
  [email, hash]).then(async (result) => {
      const user = result.rows[0];
      if (!user || new Date() > user.expires.getTime()) {
        throw new Error;
      } else {
        const { rows } = await client.query(`UPDATE users SET is_verified = $1
        WHERE email = $2 AND hash = $3 RETURNING *`,[true, email, hash]
        );
        const updatedUser = rows[0];
        console.log('updatedUser:', updatedUser);
        if (!updatedUser || !updatedUser.is_verified) {
          throw new Error;
        } else {
          console.log('Success updating');
          res.writeHead(301, {
            Location: '/login',
          });
          res.end();
          return true;
        }
      }
    }).catch((err) => {
      console.log(err);
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