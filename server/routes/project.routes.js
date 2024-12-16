import express from 'express'

import {
  createProject,
  deleteProject,
  getAllProjects,
  updateProject,
} from '../controllers/project.controller.js'

import { authorizeRole, isLoggedIn } from '../middlewares/auth.middleware.js'

const router = express.Router()

router.get('/', isLoggedIn, getAllProjects)

router.post('/', isLoggedIn, authorizeRole, createProject)

router.put('/:projectId', isLoggedIn, authorizeRole, updateProject)

router.delete('/:projectId', isLoggedIn, authorizeRole, deleteProject)

export default router
