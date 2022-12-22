import type { NextApiRequest, NextApiResponse } from 'next';
import utils from '../../lib/crypto.js';
import { sendPasswordResetEmail } from '../../lib/emailers.js';
import client from '../../database/db.js';

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let {
    email,
    password,
    token
  } = JSON.parse(req.body);
  if (req.method !== 'POST') {
    res.status(400).json({ error: 'Improper request.' });
    res.end();
  }
  const salt = await utils.createRandom32String();
  const hashedPassword = await utils.createHash(password, salt);
  const values = [hashedPassword, salt, new Date(), true, email];
  try {
    //MUST CONFIRM TOKEN FIRST.
    const { rows } = await client.query(`UPDATE users SET
    password = $1, salt = $2, token_expires = $3, is_verified = $4 WHERE email = $5 RETURNING *`,
    values);
    const updatedUser = rows[0];
    console.log('updatedUser:', updatedUser);
    if (!updatedUser) {
      res.status(422).json({ error: 'Cannot update password.' });
    } else {
      res.status(200).json({ message: 'Password was reset.' });
    }
  } catch(err) {
    console.log(err);
    res.status(500).send(err);
  }
}