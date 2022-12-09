// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  blockUser: string,
  favUser: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log(req.body);
  console.log(req.body.block);
  console.log(req.body.favorite);
  if (req.body.block !== '') {
    res.status(200).json({
      blockUser: req.body.block,
      favUser: ''
    });
    console.log('block response sent');
  } else if (req.body.favorite !== '') {
    res.status(200).json({
      favUser: req.body.favorite,
      blockUser: ''
    });
    console.log('favorite response sent');
  } else {
    res.status(404);
  }
}
