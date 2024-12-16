import userModel from '../models/user.model.js'
import AppError from '../utils/error.utils.js'
import jwt from 'jsonwebtoken'

export const isLoggedIn = async (req, res, next) => {
  const { token } = req.cookies

  if (!token) {
    return next(new AppError('Unauthenticated, please login again', 400))
  }

  const userDetails = await jwt.verify(token, process.env.JWT_SECRET)

  const freshUser = await userModel.findById(userDetails.id)

  if (!freshUser) {
    return next(new AppError('User not found', 400))
  }

  req.user = freshUser

  next()
}

// authorised roles
export const authorizeRole = async (req, res, next) => {
  const isAdmin = req.user.isAdmin
  console.log('isAdmin: ', isAdmin)
  if (!isAdmin)
    return next(new AppError('You are not allowed to access this route', 403))
  next()
}
