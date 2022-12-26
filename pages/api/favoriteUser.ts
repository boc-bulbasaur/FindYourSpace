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
      favoriting_user_id,
      favorited_user_id,
    } = JSON.parse(req.body);
    console.log('inputs', favoriting_user_id, favorited_user_id);
    const { rows } = await client.query(`SELECT * FROM favorite_user WHERE favoriting_user_id = '${favoriting_user_id}' AND favorited_user_id = '${favorited_user_id}'`);
    const user = rows[0];
    console.log('user', user);
    if (user !== undefined) {
      res.status(200).json({ error: 'User is already favorited.' });
    } else {
      const values = [favoriting_user_id, favorited_user_id];
      const { rows } = await client.query(`INSERT INTO favorite_user
        (favoriting_user_id, favorited_user_id)
        VALUES ($1, $2) RETURNING *`,
        values);
      const responseData = rows[0];
      console.log('result: ', responseData);
      if (!responseData) {
        throw new Error;
      } else {
        res.status(201).json({ message: 'User successfully favorited.' });
      }
    }
  } catch (err: any) {
    console.log(err);
    res.status(500).send(err);
  }
}