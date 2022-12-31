import type { NextApiRequest, NextApiResponse } from 'next';
import client from '../../database/db.js';

type Data = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  if (req.method === 'POST') {
    try {
      let body = JSON.parse(req.body);
      let booking = {
        listing: body.listingId,
        email: body.email,
        start: body.startTime,
        end: body.endTime,
        code: body.code
      }
      console.log('email', booking.email);
      // const result = await client.query(`
      //   INSERT INTO bookings (userid, listing_id, conf_code, start_time, end_time)
      //   VALUES (
      //     (SELECT user_id FROM users
      //      WHERE email=${booking.email}),
      //      ${booking.listing},
      //      ${booking.code},
      //      ${booking.start},
      //      ${booking.end},
      //      8,
      //      2
      //   )
      //   ON CONFLICT DO NOTHING
      // `);
      res.status(201).json({ message: "successfully added booking"});
    } catch (err: any) {
      console.log('post', err);
      res.status(500).send(err);
    }
  } else {
    res.status(400).json({error: "Error: Expecting POST." });
    res.end();
  }
}