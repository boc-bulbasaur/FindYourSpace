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
      let booking = {
        listing: req.query.listingId,
        email: req.body.email,
        address: req.body.address,
        start: req.body.startTime,
        end: req.body.endTime,
        code: req.body.code
      }
      const result = await client.query(`
        INSERT INTO public.bookings (userid, listing_id, conf_code, start_time, end_time)
        VALUES (
          (SELECT user_id FROM public.users
           WHERE email=${booking.email}),
           ${booking.listing},
           ${booking.code},
           ${booking.start},
           ${booking.end}
        )
      `);
      res.status(201).json({ message: "successfully added booking"});
    } catch (err: any) {
      console.log(err);
      res.status(500).send(err);
    }
  } else {
    res.status(400).json({error: "Error: Expecting POST." });
    res.end();
  }
}