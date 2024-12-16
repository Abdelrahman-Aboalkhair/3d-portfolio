import express from 'express'
import {
  createService,
  deleteService,
  getAllServices,
  updateService,
} from '../controllers/service.controller.js'

const router = express.Router()

router.post('/', createService)

router.get('/:userId', getAllServices)

router.put('/:id', updateService)

router.delete('/:id', deleteService)

export default router
