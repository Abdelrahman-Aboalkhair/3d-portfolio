import Project from '../models/project.model.js'
import User from '../models/user.model.js'
import { v2 as cloudinary } from 'cloudinary'

export const createProject = async (req, res) => {
  try {
    const {
      title,
      description,
      technologies,
      githubLink,
      liveLink,
      userId,
      image,
    } = req.body

    const uploadedImage = await cloudinary.uploader.upload(image, {
      folder: 'portfolio_projects',
    })

    const newProject = new Project({
      title,
      description,
      technologies,
      githubLink,
      liveLink,
      user: userId,
      image: {
        public_id: uploadedImage.public_id,
        url: uploadedImage.secure_url,
      },
    })

    const savedProject = await newProject.save()

    // Add project to the user's projects array
    await User.findByIdAndUpdate(userId, {
      $push: { projects: savedProject._id },
    })

    res.status(201).json(savedProject)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find({ user: req.params.userId })
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
      req.params.id,
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
    const project = await Project.findById(req.params.id)
    if (!project) return res.status(404).json({ error: 'Project not found' })

    // Remove project from Cloudinary
    await cloudinary.uploader.destroy(project.image.public_id)

    // Delete project and update user
    await User.findByIdAndUpdate(project.user, {
      $pull: { projects: project._id },
    })
    await project.remove()

    res.status(200).json({ message: 'Project deleted successfully' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
