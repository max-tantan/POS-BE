const db = require('../config/db')

// Untuk mengambil semua produk yang belum dihapus
exports.getAll = async () => {
    const [rows] = await db.query(
        'SELECT * FROM produk WHERE deleted_at IS NULL'
    )
    return rows
}

// Mencari produk  berdasarkan nama
exports.getByName = async (nama_produk) => {
    const [rows] = await db.query(
        'SELECT * FROM produk WHERE nama_produk = ? AND (deleted_at IS NULL)', [nama_produk]
    )
    return rows[0]
}

// menyimpan produk baru
exports.create = async (data) => {
    await db.query(
        'INSERT INTO produk (id, nama_produk, harga_produk, jenis_produk, foto_produk, deleted_at) VALUES (?, ?, ?, ?, ?, NULL)',
        [data.id, data.nama_produk, data.harga_produk, data.jenis_produk, data.foto_produk]
    )
}

exports.update = async (id, data) => {
    if (data.foto_produk) {
        await db.query(
            'UPDATE produk SET nama_produk = ?, harga_produk = ?, jenis_produk = ?, foto_produk = ? WHERE id = ?',
            [data.nama_produk, data.harga_produk, data.jenis_produk, data.foto_produk, id]
        );
    } else {
        await db.query(
            'UPDATE produk SET nama_produk = ?, harga_produk = ?, jenis_produk = ? WHERE id = ?',
            [data.nama_produk, data.harga_produk, data.jenis_produk, id]
        );
    }
};