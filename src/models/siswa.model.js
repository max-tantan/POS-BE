const db = require('../config/db')

exports.findAll = async () => {
  const [rows] = await db.query(
    "SELECT id, nama, nis, kode_kelas FROM siswa WHERE deleted_at IS NULL OR deleted_at = '0000-00-00 00:00:00'"
  )
  return rows
}

exports.findById = async (id) => {
  // Pengaman: pastikan id tidak undefined
  const [rows] = await db.query(
    "SELECT * FROM siswa WHERE id = ? AND (deleted_at IS NULL OR deleted_at = '0000-00-00 00:00:00')",
    [id || ''] 
  )
  return rows[0]
}

exports.create = async (data) => {
  const { id, nama, nis, kode_kelas } = data

  const [kelasRows] = await db.query(
    "SELECT kode_kelas FROM kelas WHERE kode_kelas = ? AND (deleted_at IS NULL OR deleted_at = '0000-00-00 00:00:00')",
    [kode_kelas || '']
  )

  if (!kelasRows.length) {
    throw new Error('Kelas tidak ditemukan')
  }

  await db.query(
    'INSERT INTO siswa (id, nama, nis, kode_kelas) VALUES (?, ?, ?, ?)',
    [id || '', nama || '', nis || '', kode_kelas || '']
  )
}

exports.findByKelas = async (kode_kelas) => {
  const [rows] = await db.query(
    "SELECT * FROM siswa WHERE kode_kelas = ? AND (deleted_at IS NULL OR deleted_at = '0000-00-00 00:00:00')",
    [kode_kelas || '']
  )
  return rows
}

exports.update = async (id, data) => {
  const { nama, nis, kode_kelas } = data

  if (kode_kelas) {
    const [kelasRows] = await db.query(
      "SELECT kode_kelas FROM kelas WHERE kode_kelas = ? AND (deleted_at IS NULL OR deleted_at = '0000-00-00 00:00:00')",
      [kode_kelas]
    )
    if (!kelasRows.length) {
      throw new Error('Kelas tidak ditemukan')
    }
  }

  // Pengaman: Loloskan data ke MySQL dengan jaminan tidak ada undefined
  await db.query(
    'UPDATE siswa SET nama = ?, nis = ?, kode_kelas = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
    [nama || '', nis || '', kode_kelas || '', id || '']
  )
}

exports.delete = async (id) => {
  // Pengaman id tidak undefined
  await db.query(
    'UPDATE siswa SET deleted_at = CURRENT_TIMESTAMP WHERE id = ?',
    [id || '']
  )
}