const asyncHandler = require('../utils/asyncHandler')
const siswaService = require('../services/siswa.service')

exports.create = asyncHandler(async (req, res) => {
  await siswaService.create(req.body)
  res.status(201).json({ message: 'Siswa created' })
})

// Membuat update siswa dengan id tertentu
exports.update = asyncHandler(async (req, res) => {
  await siswaService.update(req.params.id, req.body)
  res.status(200).json({ message: 'Siswa updated' })
})

// Membuat delete siswa dengan id tertentu
exports.delete = asyncHandler(async (req, res) => {
  await siswaService.delete(req.params.id)
  res.status(200).json({ message: 'Siswa deleted' })
})