const AppError = require('../errors/AppError')
const siswaModel = require('../models/siswa.model')

exports.create = async (data) => {
  const { id, nama, nis, kode_kelas } = data

  if (!id || !nama || !nis || !kode_kelas) {
    throw new AppError('INVALID_PAYLOAD', 400)
  }

  try {
    await siswaModel.create(data)
  } catch (error) {
    if (error.message === 'Kelas tidak ditemukan') {
      throw new AppError('KELAS_NOT_FOUND', 404)
    }

    throw error
  }
}
