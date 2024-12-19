import { configDotenv } from 'dotenv'
configDotenv()
import cors from 'cors'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import userRoutes from './routes/user.routes.js'
import projectRoutes from './routes/project.routes.js'
import serviceRoutes from './routes/service.routes.js'
import contactRoutes from './routes/contact.routes.js'
import express from 'express'
import connectToDb from './config/db.config.js'
import errorMiddleware from './middlewares/error.middleware.js'

const app = express()

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(morgan('dev'))
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }))

app.use('/api/v1/users', userRoutes)
app.use('/api/v1/projects', projectRoutes)
app.use('/api/v1/services', serviceRoutes)
app.use('/api/v1/contact', contactRoutes)

app.get('/', (req, res) => {
  res.send('Welcome to 3D Portfolio API')
})

app.all('*', (req, res) => {
  res.status(404).send('OOPS!! 404 page not found')
})

app.use(errorMiddleware)

// db init
connectToDb()

export default app
