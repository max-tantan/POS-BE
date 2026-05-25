const db = require('../config/db');

exports.create = async (data) => {
    await db.query(
        'INSERT INTO orders (id, nama_pelanggan, produk_id, jumlah, total_harga, status_pesanan) VALUES (?, ?, ?, ?, ?, ?)',
        [data.id, data.nama_pelanggan, data.produk_id, data.jumlah, data.total_harga, data.status_pesanan]
    );
};

exports.getAll = async () => {
    const [rows] = await db.query(`
        SELECT
            orders.id,
            orders.nama_pelanggan,
            produk.nama_produk,
            orders.jumlah,
            orders.total_harga,
            orders.status_pesanan,
            orders.created_at
        FROM orders
        JOIN produk ON orders.produk_id = produk.id
        ORDER BY orders.created_at DESC
        `);
    return rows;
}

exports.update = async (id, data) => {
    if (data.status_pesanan) {
        await db.query (
            `UPDATE orders SET nama_pelanggan = ?, produk_id = ?, jumlah = ?, total_harga = ?, status_pesanan = ? WHERE id = ?`,
            [data.nama_pelanggan, data.produk_id, data.jumlah, data.total_harga, data.status_pesanan, id]
        );
    } else {
        await db.query (
            `UPDATE orders SET nama_pelanggan = ?, produk_id = ?, jumlah = ?, total_harga = ? WHERE id = ?`,
            [data.nama_pelanggan, data.produk_id, data.jumlah, data.total_harga, id]
        );
    }
};

exports.delete = async (id) => {
    await db.query (
        `DELETE FROM orders WHERE ID = ?`, [id]
    );
}