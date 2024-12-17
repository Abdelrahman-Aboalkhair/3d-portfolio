import { uploadImageToCloudinary } from '../helpers/uploadImageToCloudinary.js'
import { v2 as cloudinary } from 'cloudinary'

export const handleImageUpdate = async (project, file) => {
  try {
    // Delete previous image from Cloudinary
    await cloudinary.uploader.destroy(project.avatar.public_id)

    // Upload new image to Cloudinary
    const result = await uploadImageToCloudinary(file.path)
    if (result) {
      project.avatar.public_id = result.public_id
      project.avatar.secure_url = result.secure_url

      // Remove file from server
      fs.rmSync(`uploads/${file.filename}`)
    }
  } catch (err) {
    throw new Error('File not uploaded, please try again')
  }
}
