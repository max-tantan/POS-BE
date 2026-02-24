const AppError = require('../errors/AppError')
const userModel = require('../models/user.model')

exports.getAllUsers = async () => {
  return await userModel.findAll()
}

exports.getUserById = async (id) => {
  const user = await userModel.findById(id)

  if (!user) {
    throw new AppError('USER_NOT_FOUND', 404)
  }

  return user
}

exports.deleteUser = async (id) => {
  const user = await userModel.findById(id)

  if (!user) {
    throw new AppError('USER_NOT_FOUND', 404)
  }

  await userModel.deleteById(id)
}