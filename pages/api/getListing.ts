import type { NextApiRequest, NextApiResponse } from 'next';
import client from '../../database/db.js';

type Data = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  if (req.method === 'GET') {
    try {
      let listing = req.query.listing;
      const result  = await client.query(`
       SELECT * FROM listings
       WHERE id=${listing}
      `);
      res.send(result.rows[0]);
    } catch (err: any) {
      console.log('get', err);
      res.status(500).send(err);
    }
  } else {
    res.status(400).json({error: "Error: Expecting GET." });
    res.end();
  }
}