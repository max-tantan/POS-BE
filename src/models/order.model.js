const db = require('../config/db');

exports.create = async (data) => {
    await db.query(
        'INSERT INTO orders (id, nama_pelanggan, produk_id, jumlah, total_harga, status_pesanan) VALUES (?, ?, ?, ?, ?, ?)',
        [data.id, data.nama_pelanggan, data.produk_id, data.jumlah, data.total_harga, data.status_pesanan]
    );
};