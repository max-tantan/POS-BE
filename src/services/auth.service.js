const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const AppError = require('../errors/AppError')
const userModel = require('../models/user.model')

exports.login = async (username, password) => {
  if (!username || !password) {
    throw new AppError('USERNAME_PASSWORD_REQUIRED', 400)
  }

  const user = await userModel.findByUsername(username)

  if (!user) {
    throw new AppError('INVALID_CREDENTIALS', 401)
  }

  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) {
    throw new AppError('INVALID_CREDENTIALS', 401)
  }

  const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
  )

  return { token }
}

