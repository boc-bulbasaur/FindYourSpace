import type { NextApiRequest, NextApiResponse } from 'next';
import client from '../../database/db.js';

type Data = {

}

const mokeResults = [
  {address: "some 1 places",
   id: 1,
   price: 10,
   description: "this place have one parking spot",
   coordinates: {
    lat: 28.6346,
    lng: -96.62859
   }
  },
  {address: "some 2 places",
    id: 2,
    price: 20,
    description: "this place have two parking spot",
    coordinates: {
      lat: 28.63496,
      lng: -96.62796
     }
  },
  {address: "some 3 places",
    id: 3,
    price: 40,
    description: "this place have three parking spot",
    coordinates: {
      lat: 28.63454,
      lng: -96.62495
     }
  }
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log(req.body);
  let { startTime, endTime, coordinates: {lat, lng } } = JSON.parse(req.body);
  if (req.method !== 'POST') {
    res.status(400).json({ error: 'Improper request.' });
    res.end();
  }
  try {
    console.log('inputs', startTime, endTime, lat, lng);
    const { rows } = await client.query(`SELECT id, address, lat, lng,
      ST_Distance(a.coordinates, ST_SetSRID(ST_MakePoint(${lng}, ${lat}), 4326)) AS distance
    FROM locations a
    WHERE ST_Distance(a.coordinates, ST_SetSRID(ST_MakePoint(${lng}, ${lat}), 4326)) < 10000
    ORDER BY distance;`);
    console.log(rows);
    res.status(200).send(rows);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}