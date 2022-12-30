import type { NextApiRequest, NextApiResponse } from 'next';
import client from '../../database/db.js';

export default async function startTime(req: NextApiRequest, res: NextApiResponse) {
  //request body should have user id and listing id so I can connect to both databases
  let user = req.body.userId;
  let listing = req.body.listingId;
}