import type { NextApiRequest, NextApiResponse } from 'next'
const mail = require('@sendgrid/mail')

mail.setApiKey(process.env.SENDGRID_API_KEY)
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {renter_email, renter_name, owner_email, owner_name, orderNumber, location, start, end} = req.query
  const renter = {
    to : `${renter_email}`,
    from : 'noreply@findyourspace.app',
    subject: 'Order Canacelled',
    html: ` <h1>Find you space</h1> <p>Order#${orderNumber}</p>
            <h2>Hi ${renter_name}, Your order has been successfully cancelled!</h2>
            <div>Order Summary</div>
            `,
  }
  const owner = {
    to : `${owner_email}`,
    from : 'noreply@findyourspace.app',
    subject: 'Order Canacelled',
    html: ` <h1>Find you space</h1> <p>Order#${orderNumber}</p>
            <h2>Hi ${owner_name}, Parking Spot at ${location} </h2>
            <div>Order Summary</div>
            `,
  }
  mail.send(renter)
  .then(()=>{
    res.status(200).end('success')
    console.log('renterMail sent successfully')
    // Promise.resolve()
  })
  .catch((error: any)=>{
    res.status(500).end(error)
    return Promise.resolve(error)
  })
  mail.send(owner)
  .then(()=>{
    res.status(200).end('success')
    console.log('onwerMail sent successfully')
    // Promise.resolve()
  })
  .catch((error: any)=>{
    res.status(500).end(error)
    return Promise.resolve(error)
  })
}
