const db = require('../config/db')

// Untuk mengambil semua produk yang belum dihapus
exports.getAll = async () => {
    const [rows] = await db.query(
        'SELECT * FROM produk WHERE deleted_at = "0000-00-00 00:00:00"'
    )
    return rows
}

// Mencari produk  berdasarkan nama
exports.getByName = async (nama_produk) => {
    const [rows] = await db.query(
        'SELECT * FROM produk WHERE nama_produk = ? AND deleted_at = "0000-00-00 00:00:00"', [nama_produk]
    )
    return rows[0]
}

// menyimpan produk baru
exports.create = async (data) => {
    await db.query(
        'INSERT INTO produk (id, nama_produk, harga_produk, jenis_produk, foto_produk) VALUES (?, ?, ?, ?, ?)',
        [data.id, data.nama_produk, data.harga_produk, data.jenis_produk, data.foto_produk]
    )
}