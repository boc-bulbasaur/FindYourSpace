import type { NextApiRequest, NextApiResponse } from 'next';
import utils from '../../lib/crypto.js';
import { sendVerificationEmail } from '../../lib/emailers.js';
import client from '../../database/db.js';

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const email = req.body;
  if (req.method !== 'POST') {
    res.status(400).json({ error: 'Improper request.' });
    res.end();
  }
  try {
    const { rows } = await client.query(`SELECT * FROM users WHERE email = '${email}'`);
    const user = rows[0];
    console.log('user', user);
    if (user === undefined) {
      res.status(422).json({ error: 'Cannot find user.' });
    } else {
      const token = await utils.createRandom32String();
      const token_expires = new Date(new Date().getTime() + 1000 * 60 * 60 * 24);
      const values = [token_expires, token, email];
      const { rows } = await client.query(`UPDATE users SET
        token_expires = $1, token = $2 WHERE email = $3 RETURNING *`,
        values);
      const returnedUser = rows[0];
      console.log('returnedUser:', returnedUser);
      if (!returnedUser) {
        throw new Error;
      } else {
        sendVerificationEmail(returnedUser.name, email, returnedUser.token);
        res.status(200).json({ message: 'Verification resent. Please check your email.' });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}