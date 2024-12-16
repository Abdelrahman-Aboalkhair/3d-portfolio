import Project from '../models/project.model.js'
import User from '../models/user.model.js'
import { v2 as cloudinary } from 'cloudinary'

export const createProject = async (req, res) => {
  try {
    const { title, description, technologies, githubLink, liveLink } = req.body
    const { id: userId } = req.user

    // Validate the user
    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    // Create a new project instance
    const newProject = new Project({
      title,
      description,
      technologies,
      githubLink,
      liveLink,
      user: userId,
    })

    // Save the project
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
    res
      .status(500)
      .json({ error: 'An unexpected error occurred. Please try again later.' })
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

export const updateProject = async (req, res) => {
  try {
    const { title, description, technologies, githubLink, liveLink, image } =
      req.body
    const updatedFields = {
      title,
      description,
      technologies,
      githubLink,
      liveLink,
    }

    if (image) {
      const uploadedImage = await cloudinary.uploader.upload(image, {
        folder: 'portfolio_projects',
      })
      updatedFields.image = {
        public_id: uploadedImage.public_id,
        url: uploadedImage.secure_url,
      }
    }

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.projectId,
      updatedFields,
      { new: true }
    )
    res.status(200).json(updatedProject)
  } catch (err) {
    res.status(500).json({ error: err.message })
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
