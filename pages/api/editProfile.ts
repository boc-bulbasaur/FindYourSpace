import type { NextApiRequest, NextApiResponse } from 'next';
import client from '../../database/db.js';

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  if (req.method === 'GET') {
    try {
      let user_id = req.query.user_id;
      console.log('params', req.query);
      console.log(`Retrieving username for user ${user_id}`);
      const { rows } = await client.query(`
        SELECT "name","aboutMe","email","phoneNumber" FROM public.users
        WHERE user_id = ${user_id}
      `);
        // ${user_id}
      console.log('log username result here', rows);
      res.status(200).json(rows[0]);
      return
    } catch (err: any) {
      console.log(err);
      res.status(500).send(err);
    }
  } if (req.method === 'PUT') {
    try {
      // let user_id = req.query.user_id;
      // console.log('put request log user_id', user_id);
      const body = JSON.parse(req.body);
      console.log('PUT request-log body here', body);
      const { aboutMe } = body;
      // TODO: need to change query with UPDATE ... SET...
      const { rows } = await client.query(`
        UPDATE users SET "aboutMe"='${aboutMe}'
        WHERE user_id = 2
      `);
        // ${user_id}
      alert('Your profile is successfully updated.');
      console.log('log put request rows result here', rows);
      res.status(200).json(rows[0]);
    } catch (err: any) {
      console.log(err);
      res.status(500).send(err);
    }
  } else {
    res.status(400).json({ error: 'Error: Expecting GET or PUT.' });
    res.end();
  }
}

// if (req.method !== 'GET' || 'PUT') {
//   res.status(400).json({ error: 'Error: Expecting GET or PUT.' });
//   res.end();
// }
// try {
//   let user_id = req.query.user_id;
//   console.log('params', req.query);
//   console.log(`Retrieving username for user ${user_id}`);
//   const { rows } = await client.query(`
//     SELECT "name","aboutMe","email","phoneNumber" FROM public.users
//     WHERE user_id = ${user_id}
//   `);
//     // ${user_id}
//   console.log('log username result here', rows);
//   res.status(200).json(rows[0]);
// } catch (err: any) {
//   console.log(err);
//   res.status(500).send(err);
// }