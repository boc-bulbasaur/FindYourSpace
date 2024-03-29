import client from '../../../database/db.js';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const result = await client.query("INSERT INTO locations (lat, lng, address) VALUES ($1, $2, $3) RETURNING*",
      [req.body.lat, req.body.lng, req.body.address]
    )
    res.send(result.rows[0])
  }
}