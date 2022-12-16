const nodemailer = require("nodemailer");

export default async function sendVerificationEmail(name, email, token) {
  const escapedEmail = encodeURIComponent(email);
  const URL = `${process.env.NEXTAUTH_URL}/verify-email/${escapedEmail}/${token}`;
  console.log(URL);
  let transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: process.env.EMAIL_SERVER_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  });

  let info = await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "Find Your Space verify email address",
    text: `Click here to verify your email: ${URL}`, // plain text body
    html: `<a href=${URL}>Click here to verify your email.</a>`, //html body
  });

  console.log("Message sent: %s", info.messageId);
};