import db from '../../../database/db.js';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const result = await db.query("INSERT INTO images (url, type) VALUES ($1, $2) RETURNING*",
      [req.body.url, req.body.type]
    )
    res.send(result.rows[0])
  }
}