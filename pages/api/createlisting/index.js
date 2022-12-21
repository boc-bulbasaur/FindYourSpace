import db from '../../../database/index.js';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const result = await db.query(
      `INSERT INTO listings (
        attended,
        gated,
        electric_charger,
        garage,
        always_available,
        high_clearance,
        description,
        special_information,
        image_id,
        minimum_stay,
        maximum_stay,
        short_term_rate,
        long_term_rate,
        user_id,
        type,
        location_id,
        first_available,
        last_available
      ) VALUES (
          $1,
          $2,
          $3,
          $4,
          $5,
          $6,
          $7,
          $8,
          $9,
          $10,
          $11,
          $12,
          $13,
          1,
          $14,
          $15,
          $16,
          $17
        ) RETURNING *`,
          [req.body.attended,
          req.body.gated,
          req.body.electric_charger,
          req.body.garage,
          req.body.always_available,
          req.body.high_clearance,
          req.body.description,
          req.body.special_information,
          req.body.image_id,
          req.body.minimum_stay,
          req.body.maximum_stay,
          req.body.short_term_rate,
          req.body.long_term_rate,
          req.body.type,
          req.body.location_id,
          req.body.first_available,
          req.body.last_available]
      )
    res.send(result.rows[0])
  }
}