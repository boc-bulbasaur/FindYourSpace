import type { NextApiRequest, NextApiResponse } from 'next'
const mail = require('@sendgrid/mail')

type Data = {
  name: string
}

mail.setApiKey(process.env.SENDGRID_API_KEY)

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const message = `
    Name: 'test'
    Email: 'shzf13@gmail.com'
    Message: 'test'
  `
  const data = {
    to : 'shzf13@gmail.com',
    from : 'noreply@findyourspace.app',
    subject: 'Test subject!',
    text: 'test message',
  }
  // const body = JSON.parse(req.body)
  mail.send(data)
  .then(()=>{
    res.status(200).end('success')
    console.log('Mail sent successfully')
    // resolve()
  })
  .catch((error)=>{
    return res.status(500).end(error)
    console.log(error)
  })
}
