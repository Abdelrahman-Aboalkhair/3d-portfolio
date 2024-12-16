import userModel from '../models/user.model.js'
import bcrypt from 'bcrypt'
import fs from 'fs'
import cloudinary from 'cloudinary'
import AppError from '../utils/error.utils.js'

const cookieOptions = {
  httpOnly: true,
  maxAge: 7 * 24 * 60 * 60 * 1000,
  secure: true,
  sameSite: 'none',
}

// Register
export const register = async (req, res, next) => {
  try {
    const { fullName, email, password, role } = req.body

    // Check if user misses any fields
    if (!fullName || !email || !password) {
      return next(new AppError('All fields are required', 400))
    }

    // Check if the user already exists
    const userExist = await userModel.findOne({ email })
    if (userExist) {
      return next(new AppError('Email already exists, please login', 400))
    }

    // Save user in the database and log the user in
    const user = await userModel.create({
      fullName,
      email,
      password,
      role,
      avatar: {
        public_id: email,
        secure_url: '',
      },
    })

    if (!user) {
      return next(
        new AppError('User registration failed, please try again', 400)
      )
    }

    // File upload
    if (req.file) {
      try {
        const result = await cloudinary.v2.uploader.upload(req.file.path, {
          folder: 'Learning-Management-System',
          width: 250,
          height: 250,
          gravity: 'faces',
          crop: 'fill',
        })

        if (result) {
          user.avatar.public_id = result.public_id
          user.avatar.secure_url = result.secure_url

          // Remove the file from the server
          fs.rmSync(`uploads/${req.file.filename}`)
        }
      } catch (e) {
        return next(
          new AppError(e.message || 'File not uploaded, please try again', 500)
        )
      }
    }

    await user.save()

    user.password = undefined

    const token = await user.generateJWTToken()

    res.cookie('token', token, cookieOptions)

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user,
    })
  } catch (e) {
    return next(new AppError(e.message, 500))
  }
}

// login
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    // check if user miss any field
    if (!email || !password) {
      return next(new AppError('All fields are required', 400))
    }

    const user = await userModel.findOne({ email }).select('+password')

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return next(new AppError('Email or Password does not match', 400))
    }

    const token = await user.generateJWTToken()

    user.password = undefined

    res.cookie('token', token, cookieOptions)

    res.status(200).json({
      success: true,
      message: 'User loggedin successfully',
      user,
    })
  } catch (e) {
    return next(new AppError(e.message, 500))
  }
}

// logout
export const logout = async (req, res, next) => {
  try {
    res.cookie('token', null, {
      secure: true,
      maxAge: 0,
      httpOnly: true,
    })

    res.status(200).json({
      success: true,
      message: 'User loggedout successfully',
    })
  } catch (e) {
    return next(new AppError(e.message, 500))
  }
}

// getProfile
export const getProfile = async (req, res, next) => {
  try {
    const { id } = req.user

    const user = await userModel.findById(id).populate('enrolledCourses')

    if (!user) {
      return next(new AppError('User not found', 404))
    }

    res.status(200).json({
      success: true,
      message: 'User details',
      user,
    })
  } catch (e) {
    return next(new AppError('Failed to fetch user profile', 500))
  }
}
