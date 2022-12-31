import type { NextApiRequest, NextApiResponse } from 'next';
import client from '../../database/db.js';

type Data = {}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let { startTime, endTime, coordinates: {lat, lng } } = JSON.parse(req.body);
  if (req.method !== 'POST') {
    res.status(400).json({ error: 'Improper request.' });
    res.end();
  }
  const duration = (Date.parse(endTime) - Date.parse(startTime)) / 3600000;
  let price;
  if (duration >= 24) {
    price = 'long_term_rate';
  } else {
    price = 'short_term_rate';
  }
  try {
    console.log('inputs', startTime, endTime, lat, lng);
    const { rows } = await client.query(`SELECT a.id as id, a.address as address, a.lat as lat,
      a.lng as lng, a.${price} as price, b.url as url, a.attended as attended, a.gated as gated,
      a.electric_charger as electric, a.garage as garage, a.always_available as always_available,
      a.high_clearance as high_clearance, a.description as description, a.special_information as
       special_information, a.user_id as owner_id, a.type as type,
      ST_Distance(a.coordinates, ST_SetSRID(ST_MakePoint(${lng}, ${lat}), 4326)) AS distance
    FROM listings a
    JOIN images b ON b.id = a.image_id
    WHERE
      ST_Distance(a.coordinates, ST_SetSRID(ST_MakePoint(${lng}, ${lat}), 4326)) < 1000 AND
      a.first_available_timestamptz <= timestamp '${startTime}' AND a.last_available_timestamptz >= timestamp '${endTime}'
    ORDER BY distance;`);
    console.log(rows);
    res.status(200).send(rows);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}