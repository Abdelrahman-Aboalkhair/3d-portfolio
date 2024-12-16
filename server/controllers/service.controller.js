import Service from '../models/service.model.js'
import User from '../models/user.model.js'
import { v2 as cloudinary } from 'cloudinary'

export const createService = async (req, res) => {
  try {
    const { title, description, price, userId, image } = req.body

    const uploadedImage = await cloudinary.uploader.upload(image, {
      folder: 'portfolio_services',
    })

    const newService = new Service({
      title,
      description,
      price,
      user: userId,
      image: {
        public_id: uploadedImage.public_id,
        url: uploadedImage.secure_url,
      },
    })

    const savedService = await newService.save()

    // Add service to the user's services array if needed
    await User.findByIdAndUpdate(userId, {
      $push: { services: savedService._id },
    })

    res.status(201).json(savedService)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const getAllServices = async (req, res) => {
  try {
    const services = await Service.find({ user: req.params.userId })
    res.status(200).json(services)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const updateService = async (req, res) => {
  try {
    const { title, description, price, image } = req.body
    const updatedFields = { title, description, price }

    if (image) {
      const uploadedImage = await cloudinary.uploader.upload(image, {
        folder: 'portfolio_services',
      })
      updatedFields.image = {
        public_id: uploadedImage.public_id,
        url: uploadedImage.secure_url,
      }
    }

    const updatedService = await Service.findByIdAndUpdate(
      req.params.id,
      updatedFields,
      { new: true }
    )
    res.status(200).json(updatedService)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id)
    if (!service) return res.status(404).json({ error: 'Service not found' })

    // Remove service from Cloudinary
    await cloudinary.uploader.destroy(service.image.public_id)

    // Delete service and update user
    await User.findByIdAndUpdate(service.user, {
      $pull: { services: service._id },
    })
    await service.remove()

    res.status(200).json({ message: 'Service deleted successfully' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
