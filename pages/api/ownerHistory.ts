import type { NextApiRequest, NextApiResponse } from 'next';
import client from '../../database/db.js';

type data = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<data>
) {
  if (req.method !== 'GET') {
    res.status(400).json({message: 'error'});
    res.end();
  }

    try {
      const { rows } = await client.query(
      `SELECT bookings.conf_code as id, users.name, locations.address, listings.short_term_rate, listings.long_term_rate, bookings.start_time, bookings.end_time, bookings.duration
      FROM bookings
      JOIN listings
      ON bookings.listing_id = listings.id
      JOIN locations
      ON bookings.address_id = locations.id
      JOIN users
      ON listings.user_id = users.user_id
      WHERE bookings.start_time >= '2022-12-01' AND bookings.start_time < '2023-03-01'`);
      console.log(rows);
      res.status(200).send(rows);
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }

}