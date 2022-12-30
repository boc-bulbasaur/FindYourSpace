import type { NextApiRequest, NextApiResponse } from 'next';
import client from '../../database/db.js';

export default async function handler(req, res) {
  res.status(200).json({ text: 'Reservation page is working'});
}