require('dotenv').config()
const mail = require('@sendgrid/mail')


const handleEmail= (email, locations, time, type, name)=> {
  mail.setApiKey(process.env.SENDGRID_API_KEY)
  const data = {
    to : `${email}`,
    from : 'noreply@findyourspace.app',
    subject: 'Parking Spot Schedule Reminder',
    html: ` <h1>Find you space</h1>
            <h2>Hi, ${name} </h2>
            <div>Your Parking time will ${type} in 15 mins at ${time}</div>
            <p>Location: ${locations}</p>
            <p>Special Instruction: ${special}</p>
            `,
  }
  mail.send(data)
  .then(()=>{
    console.log('Mail sent successfully')
  })
  .catch((error)=>{
    console.log('Mail Error')
  })
}

module.exports = handleEmail