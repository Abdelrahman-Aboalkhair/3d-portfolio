import express from 'express'
import {
  createService,
  deleteService,
  getAllServices,
  updateService,
} from '../controllers/service.controller.js'

import { isLoggedIn, authorizeRole } from '../middlewares/auth.middleware.js'

const router = express.Router()

router.post('/', isLoggedIn, authorizeRole, createService)

router.get('/', isLoggedIn, getAllServices)

router.put('/:serviceId', isLoggedIn, authorizeRole, updateService)

router.delete('/:serviceId', isLoggedIn, authorizeRole, deleteService)

export default router
