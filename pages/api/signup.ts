import type { NextApiRequest, NextApiResponse } from 'next';
import utils from '../../lib/crypto.js';
import sendVerificationEmail from '../../lib/verify-email.js';
import client from '../../database/db.js';

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let {
    name,
    email,
    password,
  } = JSON.parse(req.body);
  if (req.method !== 'POST') {
    res.status(400).json({ error: 'Improper request.' });
    res.end();
  }
  try {
    console.log('inputs', name, email, password);
    const { rows } = await client.query(`SELECT * FROM users WHERE email = '${email}'`);
    const user = rows[0];
    console.log('user', user);
    if (user !== undefined) {
      res.status(422).json({ error: 'Cannot create user.' });
    } else {
      const salt = await utils.createRandom32String();
      password = await utils.createHash(password, salt);
      const hash = await utils.createRandom32String();
      const registered_at = new Date();
      const expires = new Date(registered_at.getTime() + 1000 * 60 * 60 * 24);
      const values = [name, email, password, salt, registered_at, expires, hash];
      const { rows } = await client.query(`INSERT INTO users
        (name, email, password, salt, registered_at, expires, hash)
        VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
        values);
      const newUser = rows[0];
      console.log('newUser:', newUser);
      if (!newUser) {
        throw new Error;
      } else {
        sendVerificationEmail(name, email, newUser.hash);
        res.status(201).json({ message: 'User successfully created. Please verify your email.' });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}