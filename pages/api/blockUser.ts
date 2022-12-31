import type { NextApiRequest, NextApiResponse } from 'next';
import client from '../../database/db.js';

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'POST') {
    res.status(400).json({ error: 'Improper request. Expecting POST.' });
    res.end();
  }
  try {
    let {
      user_id,
      blocked_user_id,
    } = JSON.parse(req.body);
    console.log('inputs', user_id, blocked_user_id);
    const { rows } = await client.query(`SELECT * FROM blocked WHERE user_id = '${user_id}' AND blocked_user_id = '${blocked_user_id}'`);
    const user = rows[0];
    console.log('user', user);
    if (user !== undefined) {
      res.status(200).json({ notification: 'User is already blocked.' });
    } else {
      const values = [user_id, blocked_user_id];
      const { rows } = await client.query(`INSERT INTO blocked
        (user_id, blocked_user_id)
        VALUES ($1, $2) RETURNING *`,
        values);
      const responseData = rows[0];
      console.log('result: ', responseData);
      if (!responseData) {
        throw new Error;
      } else {
        res.status(201).json({ message: 'User successfully blocked.' });
      }
    }
  } catch (err: any) {
    console.log(err);
    res.status(500).send(err);
  }
}