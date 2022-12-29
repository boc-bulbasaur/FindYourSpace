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
    res.status(400).json({ error: 'Error: Expecting GET.' });
    res.end();
  }
  try {
    let user_id = req.query.user_id;
    console.log('params', req.query);
    console.log(`Retrieving username for user ${user_id}`);
    const { rows } = await client.query(`
      SELECT "name","aboutMe","email","phoneNumber" FROM public.users
      WHERE user_id = ${user_id}
    `);
      // ${user_id}
    console.log('log username result here', rows);
    res.status(200).json(rows[0]);
  } catch (err: any) {
    console.log(err);
    res.status(500).send(err);
  }
}