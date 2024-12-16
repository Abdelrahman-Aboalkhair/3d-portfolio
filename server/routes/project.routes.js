import express from 'express'

import {
  createProject,
  deleteProject,
  getAllProjects,
  updateProject,
} from '../controllers/project.controller.js'

const router = express.Router()

router.post('/', createProject)

router.get('/:userId', getAllProjects)

router.put('/:id', updateProject)

router.delete('/:id', deleteProject)

export default router
