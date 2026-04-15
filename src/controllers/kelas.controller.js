const asyncHandler = require('../utils/asyncHandler')
const kelasService = require('../services/kelas.service')

exports.getAll = asyncHandler(async (req, res) => {
  const data = await kelasService.getAll()
  res.json(data)
})

exports.getById = asyncHandler(async (req, res) => {
  const data = await kelasService.getById(req.params.kode_kelas)
  res.json(data)
})

exports.create = asyncHandler(async (req, res) => {
  await kelasService.create(req.body)
  res.status(201).json({ message: 'Kelas dibuat' })
})

exports.update = asyncHandler(async (req, res) => {
  await kelasService.update(req.params.id, req.body)
  res.json({ message: 'Kelas diperbarui' })
})

exports.delete = asyncHandler(async (req, res) => {
  await kelasService.delete(req.params.id)
  res.json({ message: 'Kelas dihapus' })
})
