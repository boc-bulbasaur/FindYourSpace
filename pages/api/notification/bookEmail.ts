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
  const {email, name, orderNumber, price, booktime} = req.query
  const data = {
    to : `${email}`,
    from : 'noreply@findyourspace.app',
    subject: 'Confirmation',
    html: ` <h1>Find you space</h1> <p>Order#${orderNumber}</p>
            <h2>Hi ${name}, Thank you for booking parking spot at !</h2>
            <div>Order Summary</div>
              <table>
              <tr>
              <th align='left'>Subtotal</th>
              <br><br>
              <td>$500</td>
              </tr>
              <tr>
              <th align='left'>Taxes</th>
              <br><br>
              <td>$50</td>
              </tr>
              <tr>
              <th align='left'>Total</th>
              <br><br>
              <td>$${price}</td>
              </tr>
              </table>
            `,
  }
  mail.send(data)
  .then(()=>{
    res.status(200).end('success')
    console.log('Mail sent successfully')
    // Promise.resolve()
  })
  .catch((error: any)=>{
    res.status(500).end(error)
    return Promise.resolve(error)
  })
}
