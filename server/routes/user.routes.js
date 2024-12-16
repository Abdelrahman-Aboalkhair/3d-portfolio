import express from 'express'
const router = express.Router()
import {
  register,
  login,
  logout,
  getProfile,
} from '../controllers/user.controller.js'

import upload from '../middlewares/multer.middleware.js'
import { isLoggedIn } from '../middlewares/auth.middleware.js'

router.post('/register', upload.single('avatar'), register)
router.post('/login', login)
router.post('/logout', logout)
router.get('/me', isLoggedIn, getProfile)

export default router
