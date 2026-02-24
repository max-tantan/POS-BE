const asyncHandler = require('../utils/asyncHandler')
const userService = require('../services/user.service')

exports.getAll = asyncHandler(async (req, res) => {
  const users = await userService.getAllUsers()
  res.json(users)
})

exports.getById = asyncHandler(async (req, res) => {
  const user = await userService.getUserById(req.params.id)
  res.json(user)
})

exports.delete = asyncHandler(async (req, res) => {
  await userService.deleteUser(req.params.id)
  res.json({ message: 'User deleted' })
})