import express from 'express'

import {
  createProject,
  deleteProject,
  getAllProjects,
  updateProject,
} from '../controllers/project.controller.js'

import { authorizeRole, isLoggedIn } from '../middlewares/auth.middleware.js'
import upload from '../middlewares/multer.middleware.js'

const router = express.Router()

router.get('/', isLoggedIn, getAllProjects)

router.post(
  '/',
  isLoggedIn,
  authorizeRole,
  upload.single('image'),
  createProject
)

router.put('/:projectId', isLoggedIn, authorizeRole, updateProject)

router.delete('/:projectId', isLoggedIn, authorizeRole, deleteProject)

export default router
