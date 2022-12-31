import type { NextApiRequest, NextApiResponse } from 'next';
import client from '../../database/db.js';

type Data = {}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let { startTime, endTime, coordinates: {lat, lng }, user_id } = JSON.parse(req.body);
  if (req.method !== 'POST') {
    res.status(400).json({ error: 'Improper request.' });
    res.end();
  }
  try {
    const { rows } = await client.query(`SELECT a.id as id, a.address as address, a.lat as lat,
      a.lng as lng, a.short_term_rate, a.long_term_rate, b.url as url, a.attended as attended,
      a.gated as gated, a.electric_charger as electric, a.garage as garage,
      a.always_available as always_available, a.high_clearance as high_clearance,
      a.description as description, a.special_information as special_information,
      a.user_id as owner_id, a.type as type,
      ST_Distance(a.coordinates, ST_SetSRID(ST_MakePoint(${lng}, ${lat}), 4326)) AS distance
    FROM listings a
    JOIN images b ON b.id = a.image_id
    WHERE
      ST_Distance(a.coordinates, ST_SetSRID(ST_MakePoint(${lng}, ${lat}), 4326)) < 1000 AND
      a.first_available_timestamptz <= timestamp '${startTime}' AND a.last_available_timestamptz >= timestamp '${endTime}'
    ORDER BY distance;`);
    // console.log(rows);
    // console.log(user_id);
    if (user_id) {
      let results: Object[] = [];
      for (const row of rows) {
        const owner_id = row['owner_id'];
        const res1 = await client.query(`SELECT id FROM blocked c
        WHERE c.user_id = ${owner_id} AND c.blocked_user_id = ${user_id}`)
        const res2 = await client.query(`SELECT id FROM bookings d
        WHERE d.listing_id = ${row.id} AND (d.start_time, d.end_time) OVERLAPS (timestamp '${startTime}', timestamp '${endTime}')`)
        if (res1.rowCount === 0 && res2.rowCount === 0) {
          results.push(row);
        }
      }
      res.status(200).send(results);
    } else {
      res.status(200).send(rows)
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}