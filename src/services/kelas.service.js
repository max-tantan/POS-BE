const AppError = require('../errors/AppError')
const kelasModel = require('../models/kelas.model')

exports.getAll = async () => {
  return await kelasModel.findAll()
}

exports.getById = async (kode_kelas) => {
  const kelas = await kelasModel.findById(kode_kelas)

  if (!kelas) {
    throw new AppError('KELAS_NOT_FOUND', 404)
  }

  return kelas
}

exports.create = async (data) => {
  if (!data.kode_kelas || !data.nama_kelas) {
    throw new AppError('INVALID_PAYLOAD', 400)
  }

  const existing = await kelasModel.findById(data.kode_kelas)

  if (existing) {
    throw new AppError('KELAS_ALREADY_EXISTS', 400)
  }

  await kelasModel.create(data)
}

exports.update = async (kode_kelas, data) => {
  const kelas = await kelasModel.findById(kode_kelas)

  if (!kelas) {
    throw new AppError('KELAS_NOT_FOUND', 404)
  }

  await kelasModel.update(kode_kelas, data)
}

exports.delete = async (kode_kelas) => {
  const kelas = await kelasModel.findById(kode_kelas)

  if (!kelas) {
    throw new AppError('KELAS_NOT_FOUND', 404)
  }

  await kelasModel.softDelete(kode_kelas)
}
