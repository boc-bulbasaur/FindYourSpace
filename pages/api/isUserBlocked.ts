import type { NextApiRequest, NextApiResponse } from 'next';
import client from '../../database/db.js';

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'GET') {
    res.status(400).json({ error: 'Improper request. Expecting GET.' });
    res.end();
  }
  try {
    let user_id = req.query.user;
    let blocked_user_id = req.query.blocked_user;
    console.log('params', req.query);
    console.log(`Retrieving blockings for user combo ${user_id}-${blocked_user_id}`);
    const { rows } = await client.query(`
      SELECT
        *
      FROM blocked
      WHERE blocked.user_id = ${user_id} AND
            blocked.blocked_user_id = ${blocked_user_id}`);
    if (rows[0] !== undefined) {
      console.log('blocked!');
      res.status(200).json(rows);
    } else {
      console.log('NOT blocked!');
      res.status(404).send(rows);
    }
  } catch (err: any) {
    res.status(500).send(err);
  }
}