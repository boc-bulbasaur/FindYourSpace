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
      let conf_code = req.body.code;
      console.log('id', conf_code);
      const result = await client.query(`
        DELETE FROM public.bookings
        WHERE conf_code = ${conf_code}
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