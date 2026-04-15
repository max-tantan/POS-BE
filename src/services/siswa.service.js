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

exports.update = async (id, data) => {
  const siswa = await siswaModel.findById(id)
  if (!siswa) {
    const error = new Error('Siswa tidak ditemukan')
    error.statusCode = 404
    throw error
  }

  const updateData = {
    nama: data.nama || siswa.nama,
    nis: data.nis || siswa.nis,
    kode_kelas: data.kode_kelas || siswa.kode_kelas
  }

  await siswaModel.update(id, updateData)
}

exports.delete = async (id) => {
  const siswa = await siswaModel.findById(id)
  if (!siswa) {
    const error = new Error('Siswa tidak ditemukan')
    error.statusCode = 404
    throw error
  }

  await siswaModel.delete(id)
}
