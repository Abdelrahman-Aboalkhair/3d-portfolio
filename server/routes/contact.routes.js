import express from 'express'
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
 <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.5; text-align: center; max-width: 600px; margin: 0 auto;">
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
  const {
    subject,
    name: senderName,
    email: senderEmail,
    message: senderMessage,
  } = req.body

  // Validate request body
  const validationError = validateRequestBody({
    subject,
    name: senderName,
    email: senderEmail,
    message: senderMessage,
  })
  if (validationError) {
    return res.status(400).json({ error: validationError })
  }

  try {
    // Send confirmation email to client
    const clientMailOptions = {
      from: 'bgbody5@gmail.com', // Sender email (your email)
      to: senderEmail, // Recipient email (client's email)
      subject: `Thank you for contacting us!`, // Subject for the client
      html: generateEmailHtml(), // HTML content for the client
    }

    // Send notification email to you (the owner)
    const ownerMailOptions = {
      from: senderEmail, // Client's email as the sender
      to: 'bgbody5@gmail.com', // Your email
      subject: `New Message from ${senderName} - ${subject}`, // Subject for you
      text: `You received a new message from ${senderName} (${senderEmail}):\n\n${senderMessage}`, // Plain text message for you
      html: `
        <p>You received a new message from <strong>${senderName}</strong> (${senderEmail}):</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${senderMessage}</p>
      `, // HTML version for you
    }

    // Send both emails
    await sendEmail(clientMailOptions) // Send confirmation email to client
    await sendEmail(ownerMailOptions) // Send the message to your email

    res.status(200).json({ success: true, message: 'Email sent successfully' })
  } catch (error) {
    console.error('Error sending email:', error)
    res.status(500).json({ error: 'Failed to send email' })
  }
})

export default router
