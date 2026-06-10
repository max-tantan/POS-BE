const db = require('../config/db');

exports.create = async (data) => {
    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();
        await connection.query(
            'INSERT INTO orders (id, nama_pelanggan, total_harga, status_pesanan) VALUES (?, ?, ?, ?)',
            [data.id, data.nama_pelanggan, data.total_harga, data.status_pesanan]
        );
        
        for (const item of data.items) {
            await connection.query(
                'INSERT INTO order_items (order_id, produk_id, jumlah) VALUES (?, ?, ?)',
                [data.id, item.produk_id, item.jumlah]
            );
        }
        
        await connection.commit();
    } catch (err) {
        await connection.rollback();
        throw err;
    } finally {
        connection.release();
    }
};

exports.getAll = async () => {
    const [rows] = await db.query(`
        SELECT
            orders.id,
            orders.nama_pelanggan,
            GROUP_CONCAT(CONCAT(produk.nama_produk, ' x', order_items.jumlah) SEPARATOR ', ') as nama_produk,
            SUM(order_items.jumlah) as jumlah,
            orders.total_harga,
            orders.status_pesanan,
            orders.created_at
        FROM orders
        JOIN order_items ON orders.id = order_items.order_id
        JOIN produk ON order_items.produk_id = produk.id
        GROUP BY orders.id
        ORDER BY orders.created_at DESC
        `);
    return rows;
}

exports.update = async (id, data) => {
    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();
        
        if (data.status_pesanan) {
            await connection.query(
                `UPDATE orders SET nama_pelanggan = ?, total_harga = ?, status_pesanan = ? WHERE id = ?`,
                [data.nama_pelanggan, data.total_harga, data.status_pesanan, id]
            );
        } else {
            await connection.query(
                `UPDATE orders SET nama_pelanggan = ?, total_harga = ? WHERE id = ?`,
                [data.nama_pelanggan, data.total_harga, id]
            );
        }
        
        if (data.items && data.items.length > 0) {
            await connection.query(`DELETE FROM order_items WHERE order_id = ?`, [id]);
            for (const item of data.items) {
                await connection.query(
                    'INSERT INTO order_items (order_id, produk_id, jumlah) VALUES (?, ?, ?)',
                    [id, item.produk_id, item.jumlah]
                );
            }
        }
        
        await connection.commit();
    } catch (err) {
        await connection.rollback();
        throw err;
    } finally {
        connection.release();
    }
};

exports.delete = async (id) => {
    // ON DELETE CASCADE will handle order_items automatically
    await db.query(
        `DELETE FROM orders WHERE ID = ?`, [id]
    );
}