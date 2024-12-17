import Project from '../models/project.model.js'
import User from '../models/user.model.js'
import { v2 as cloudinary } from 'cloudinary'
import AppError from '../utils/error.utils.js'
import { uploadImageToCloudinary } from '../helpers/uploadImageToCloudinary.js'
import fs from 'fs'
import { handleImageUpdate } from '../utils/handleImageUpdate.js'

export const createProject = async (req, res, next) => {
  try {
    const { title, description, technologies, githubLink, liveLink } = req.body
    const { id: userId } = req.user

    // Validate the user
    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    // Prepare project data
    const projectData = {
      title,
      description,
      technologies,
      githubLink,
      liveLink,
      user: userId,
      image: { public_id: title, secure_url: '' },
    }

    // Handle file upload to Cloudinary
    if (req.file) {
      const uploadResult = await uploadImageToCloudinary(req.file.path)
      if (uploadResult) {
        projectData.image.public_id = uploadResult.public_id
        projectData.image.secure_url = uploadResult.secure_url

        // Remove the uploaded file from the server
        fs.rmSync(`uploads/${req.file.filename}`)
      }
    }

    // Create and save the project
    const newProject = new Project(projectData)
    const savedProject = await newProject.save()

    // Associate the project with the user
    user.projects.push(savedProject._id)
    await user.save()

    res.status(201).json({
      message: 'Project created successfully',
      savedProject,
    })
  } catch (err) {
    console.error('Error creating project:', err)
    next(
      new AppError(
        err.message || 'An unexpected error occurred. Please try again later.',
        500
      )
    )
  }
}

export const getAllProjects = async (req, res) => {
  try {
    const { id } = req.user
    const projects = await Project.find({ user: id })
    res.status(200).json(projects)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const updateProject = async (req, res, next) => {
  try {
    const { title, description, technologies, githubLink, liveLink } = req.body
    const updatedFields = {
      title,
      description,
      technologies,
      githubLink,
      liveLink,
      image: {
        public_id: title,
        secure_url: '',
      },
    }

    const project = await Project.findById(req.params.projectId)
    if (!project) {
      return res.status(404).json({ error: 'Project not found' })
    }

    if (req.file) {
      await handleImageUpdate(project, req.file)
    }

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.projectId,
      updatedFields,
      { new: true }
    )

    res.status(200).json(updatedProject)
  } catch (err) {
    next(
      new AppError(
        err.message || 'An error occurred while updating the project',
        500
      )
    )
  }
}

export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId)
    console.log('project: ', project)
    if (!project) return res.status(404).json({ error: 'Project not found' })

    // Delete project and update user
    const user = await User.findByIdAndUpdate(project.user, {
      $pull: { projects: project._id },
    })

    await project.deleteOne({ _id: project._id })

    res.status(200).json({ message: 'Project deleted successfully' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
