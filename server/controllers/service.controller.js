import { uploadImageToCloudinary } from '../helpers/uploadImageToCloudinary.js'
import Service from '../models/service.model.js'
import User from '../models/user.model.js'
import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'

export const createService = async (req, res) => {
  try {
    const { id: userId } = req.user
    const { title, description } = req.body
    console.log('title: ', title)
    console.log('description: ', description)

    const user = await User.findById(userId)
    if (!user) return res.status(404).json({ error: 'User not found' })

    const serviceData = {
      title,
      description,
      user: userId,
      image: { public_id: title, secure_url: '' },
    }

    if (req.file) {
      console.log('req.file: ', req.file)
      const uploadResult = await uploadImageToCloudinary(req.file.path)
      console.log('uploadResult: ', uploadResult)
      if (uploadResult) {
        serviceData.image.public_id = uploadResult.public_id
        serviceData.image.secure_url = uploadResult.secure_url

        // Remove the uploaded file from the server
        fs.rmSync(`uploads/${req.file.filename}`)
      }
    }

    const newService = new Service(serviceData)
    const savedService = await newService.save()

    // Add service to the user's services array if needed
    user.services.push(savedService._id)
    await user.save()

    res.status(201).json({
      message: 'Service created successfully',
      savedService,
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const getAllServices = async (req, res) => {
  try {
    const { id } = req.user
    const services = await Service.find({ user: id })
    res.status(200).json({
      message: 'Services retrieved successfully',
      services,
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const updateService = async (req, res) => {
  try {
    const { title, description, image } = req.body
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
      req.params.serviceId,
      updatedFields,
      { new: true }
    )
    res.status(200).json({
      message: 'Service updated successfully',
      updatedService,
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.serviceId)
    if (!service) return res.status(404).json({ error: 'Service not found' })

    // Remove service from Cloudinary
    // await cloudinary.uploader.destroy(service.image.public_id)

    // Delete service and update user
    await User.findByIdAndUpdate(service.user, {
      $pull: { services: service._id },
    })

    await service.deleteOne({ _id: service._id })

    res.status(200).json({ message: 'Service deleted successfully' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
