import { v2 as cloudinary } from 'cloudinary'
import AppError from '../utils/error.utils.js'

export const uploadImageToCloudinary = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'portfolio_projects',
      width: 250,
      height: 250,
      gravity: 'faces',
      crop: 'fill',
    })
    return result
  } catch (error) {
    throw new AppError(
      error.message || 'File upload to Cloudinary failed.',
      500
    )
  }
}
