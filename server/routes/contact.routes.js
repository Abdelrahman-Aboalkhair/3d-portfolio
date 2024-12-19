import express, { text } from 'express'
import sendEmail from '../utils/sendEmail.js'

const router = express.Router()

const validateRequestBody = ({ subject, name, email, message }) => {
  if (!name || !email || !message) {
    return 'All fields are required'
  }
  return null
}

const generateEmailHtml = () => {
  return `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.5;">
        <h2 style="color: #7127ba;">Thank you for reaching out to us!</h2>
        <p>We have received your message and will respond as quickly as possible. Our team is reviewing your inquiry and will get back to you soon.</p>
        <p>In the meantime, feel free to browse our platform and explore the projects:</p>
        <a href="http://localhost:5173/projects" style="display: inline-block; padding: 10px 20px; margin: 10px 0; background-color: #7127ba; color: white; text-decoration: none; border-radius: 5px;">
            Browse my projects
        </a>
        <p>If you have any urgent questions, don’t hesitate to reply to this email or contact our support team.</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
        <p style="font-size: 12px; color: #555;">
            This email was sent to you because you contacted us. If you didn’t initiate this message, please ignore this email.
        </p>
    </div>
  `
}

// Route to handle sending emails
router.post('/', async (req, res) => {
  const { subject, name: senderName, email, message } = req.body
  console.log('subject: ', subject)
  console.log('senderName: ', senderName)
  console.log('email: ', email)
  console.log('message: ', message)

  // Validate request body
  const validationError = validateRequestBody({
    subject,
    name: senderName,
    email,
    message,
  })
  if (validationError) {
    return res.status(400).json({ error: validationError })
  }

  try {
    const mailOptions = {
      from: senderName,
      to: email,
      subject: subject,
      text: message,
      html: generateEmailHtml(),
    }

    // Send email using the utility function
    await sendEmail(mailOptions)

    res.status(200).json({ success: true, message: 'Email sent successfully' })
  } catch (error) {
    console.error('Error sending email:', error)
    res.status(500).json({ error: 'Failed to send email' })
  }
})

export default router
