const nodemailer = require("nodemailer");

const color = {
  background: "#f9f9f9",
  text: "#444",
  mainBackground: "#fff",
  buttonBackground: "#346df1",
  buttonBorder: "#346df1",
  buttonText: "#fff",
}

module.exports = {
  sendVerificationEmail: async function (name, email, token) {
    const escapedEmail = encodeURIComponent(email);
    const url = `${process.env.NEXTAUTH_URL}/verify-email/${escapedEmail}/${token}`;
    const host = 'Find Your Space';
    let transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST,
      port: process.env.EMAIL_SERVER_PORT,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    });

    function html({url, host}) {
      const escapedHost = host.replace(/\./g, "&#8203;.");

      return `
    <body style="background: ${color.background};">
      <table width="100%" border="0" cellspacing="20" cellpadding="0"
        style="background: ${color.mainBackground}; max-width: 600px; margin: auto; border-radius: 10px;">
        <tr>
          <td align="center"
            style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
            Sign in to <strong>${escapedHost}</strong>
          </td>
        </tr>
        <tr>
          <td align="center" style="padding: 20px 0;">
            <table border="0" cellspacing="0" cellpadding="0">
              <tr>
                <td align="center" style="border-radius: 5px;" bgcolor="${color.buttonBackground}"><a href="${url}"
                    target="_blank"
                    style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${color.buttonText}; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid ${color.buttonBorder}; display: inline-block; font-weight: bold;">Verify
                    email</a></td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td align="center"
            style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
            If you did not request this email you can safely ignore it.
          </td>
        </tr>
      </table>
    </body>
    `
    }

    let info = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: `Verify your email with ${host}`,
      text: `Verify your email ${host}\n${url}\n\n`,
      html: html({ url, host }),
    });

    console.log("Message sent: %s", info.messageId);
  },
  sendPasswordResetEmail: async function (email, token) {
    const escapedEmail = encodeURIComponent(email);
    const url = `${process.env.NEXTAUTH_URL}/password-reset/${escapedEmail}/${token}`;
    const host = 'Find Your Space';
    let transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST,
      port: process.env.EMAIL_SERVER_PORT,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    });

    function html({url, host}) {
      const escapedHost = host.replace(/\./g, "&#8203;.");

      return `
    <body style="background: ${color.background};">
      <table width="100%" border="0" cellspacing="20" cellpadding="0"
        style="background: ${color.mainBackground}; max-width: 600px; margin: auto; border-radius: 10px;">
        <tr>
          <td align="center"
            style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
            Reset your <strong>${escapedHost}</strong> password
          </td>
        </tr>
        <tr>
          <td align="center" style="padding: 20px 0;">
            <table border="0" cellspacing="0" cellpadding="0">
              <tr>
                <td align="center" style="border-radius: 5px;" bgcolor="${color.buttonBackground}"><a href="${url}"
                    target="_blank"
                    style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${color.buttonText}; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid ${color.buttonBorder}; display: inline-block; font-weight: bold;">Password
                    reset</a></td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td align="center"
            style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
            If you did not request this email you can safely ignore it (your password will not be changed).
          </td>
        </tr>
      </table>
    </body>
    `
    }

    let info = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: `Reset your ${host} password`,
      text: `Reset your ${host} password\n${url}\n\n`,
      html: html({ url, host }),
    });

    console.log("Message sent: %s", info.messageId);
  },
};