const db = require('../config/db')

exports.findAll = async () => {
  const [rows] = await db.query(
    'SELECT kode_kelas, nama_kelas, created_at, updated_at FROM kelas WHERE deleted_at IS NULL'
  )
  return rows
}

exports.findById = async (kode_kelas) => {
  const [rows] = await db.query(
    'SELECT kode_kelas, nama_kelas FROM kelas WHERE kode_kelas = ? AND deleted_at IS NULL',
    [kode_kelas]
  )
  return rows[0]
}

exports.create = async (data) => {
  const { kode_kelas, nama_kelas } = data

  await db.query(
    'INSERT INTO kelas (kode_kelas, nama_kelas) VALUES (?, ?)',
    [kode_kelas, nama_kelas]
  )
}

exports.update = async (kode_kelas, data) => {
  const { nama_kelas } = data

  await db.query(
    'UPDATE kelas SET nama_kelas = ? WHERE kode_kelas = ?',
    [nama_kelas, kode_kelas]
  )
}

exports.softDelete = async (kode_kelas) => {
  await db.query(
    'UPDATE kelas SET deleted_at = NOW() WHERE kode_kelas = ?',
    [kode_kelas]
  )
}
