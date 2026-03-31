const asyncHandler = require('../utils/asyncHandler')
const siswaService = require('../services/siswa.service')

exports.create = asyncHandler(async (req, res) => {
  await siswaService.create(req.body)
  res.status(201).json({ message: 'Siswa created' })
})
