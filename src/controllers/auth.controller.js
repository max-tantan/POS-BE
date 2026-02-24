const asyncHandler = require('../utils/asyncHandler')
const authService = require('../services/auth.service')

exports.login = asyncHandler(async (req, res) => {
  const { username, password } = req.body
  const result = await authService.login(username, password)

  res.json({
    message: 'login success',
    token: result.token
  })
})

exports.logout = asyncHandler(async (req, res) => {
  res.json({
    message: 'logout success'
  })
})
    