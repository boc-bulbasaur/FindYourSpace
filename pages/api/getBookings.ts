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
    let user_id = req.query.user_id;
    console.log('params', req.query);
    console.log(`Retrieving bookings for user ${user_id}`);
    const { rows } = await client.query(`
      SELECT
        bookings.conf_code,
        users.name,
        locations.lat,
        locations.lng,
        locations.address,
        listings.description
      FROM bookings
      JOIN users
        ON bookings.userid = users.user_id
      JOIN locations
        ON bookings.address_id = locations.id
      JOIN listings
        ON bookings.listing_id = listings.id
      WHERE userid = ${user_id}`);
    if (rows[0] === undefined) {
      res.status(200).json({ warning: `No bookings found for user ${user_id}`});
    } else {
      res.status(200).json(rows);
    }
  } catch (err: any) {
    console.log(err);
    res.status(500).send(err);
  }
}