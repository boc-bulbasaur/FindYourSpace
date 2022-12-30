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
  const {email, name, orderNumber, price, start, end, address} = JSON.parse(req.body)
  const data = {
    to : `${email}`,
    from : 'noreply@findyourspace.app',
    subject: 'Confirmation',
    html: ` <h1>Find you space</h1> <p>Order#${orderNumber}</p>
            <h2>Hi ${name},</h2>
            <h3> Thank you for booking parking spot at ${address} !</h3>
            <h4> From  ${start}     To      ${end}</h4>
            <br></br>
            <div>Order Summary</div>
              <tr>
              <th align='left'>Total</th>
              <br><br>
              <td>$${price}</td>
              </tr>
              </table>
            `,
  }
  return mail.send(data)
        .then(()=>{
          console.log('Mail sent successfully')
          res.status(200).end('success')
          // Promise.resolve()
        })
        .catch((error: any)=>{
          res.status(500).end(error)
          return Promise.resolve(error)
        })
//  return console.log('Mail sent successfully')
}
