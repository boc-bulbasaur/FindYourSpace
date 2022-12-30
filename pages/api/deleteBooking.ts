import type { NextApiRequest, NextApiResponse } from 'next';
import client from '../../database/db.js';

type Data = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  if (req.method === 'DELETE') {
    try {
      let booking_id = req.body.id;
      console.log('id', booking_id);
      const result = await client.query(`
        DELETE FROM public.bookings
        WHERE id = ${booking_id}
        RETURNING *
      `);
      res.status(200).json({ message: "successfully deleted"});
      res.redirect('/Search');
    } catch (err: any) {
      console.log(err);
      res.status(500).send(err);
    }
  } else {
    res.status(400).json({error: "Error: Expecting DELETE." });
    res.end();
  }
}