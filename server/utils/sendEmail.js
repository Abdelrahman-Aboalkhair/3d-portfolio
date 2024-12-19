import nodemailer from 'nodemailer'

const sendEmail = async function (mailOptions) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // true for 465, false for other ports
    logger: true,
    debug: true,
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
  })

  // send mail with defined transport object
  await transporter.sendMail(mailOptions)
}

export default sendEmail
