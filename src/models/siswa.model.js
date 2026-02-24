const db = require('../config/db')

exports.findAll = async () => {
  const [rows] = await db.query(
    'SELECT id, nama, nis, kode_kelas FROM siswa WHERE deleted_at IS NULL'
  )
  return rows
}

exports.findById = async (id) => {
  const [rows] = await db.query(
    'SELECT * FROM siswa WHERE id = ? AND deleted_at IS NULL',
    [id]
  )
  return rows[0]
}

exports.create = async (data) => {
  const { id, nama, nis, kode_kelas } = data

  await db.query(
    'INSERT INTO siswa (id, nama, nis, kode_kelas) VALUES (?, ?, ?, ?)',
    [id, nama, nis, kode_kelas]
  )
}

// BUG: kolom salah nama (harusnya kode_kelas)
// todo: siswa harus validasi kelas exist
exports.findByKelas = async (kodeKelas) => {
  const [rows] = await db.query(
    'SELECT * FROM siswa WHERE kelas_kode = ?',
    [kodeKelas]
  )
  return rows
}
