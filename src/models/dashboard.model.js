const db = require('../config/db');

// --- KODINGAN APRILIA (Diperbaiki Typo SQL-nya) ---
exports.getDailyOrders = async () => {
    const [rows] = await db.query(`
        SELECT DATE(created_at) as tanggal, COUNT(id) as total_order, SUM(total_harga) as amount
        FROM orders
        GROUP BY DATE(created_at)
        ORDER BY tanggal DESC
        LIMIT 7
    `);
    return rows;
};

exports.getOrdersStatusCount = async () => {
    const [rows] = await db.query(`
        SELECT status_pesanan, COUNT(id) as total
        FROM orders 
        GROUP BY status_pesanan
    `);
    return rows;
};

// --- CODINGAN AHMAD ---
// Checklist 1 & Tugas Omzet Awal: Data Ringkasan Dashboard
exports.getSummary = async () => {
    // 1. Menghitung Total Orderan
    const [rowsTotal] = await db.query('SELECT COUNT(id) as total FROM orders');
    const totalOrderan = rowsTotal[0].total || 0;
    
    // Top Menus
    const [topMenus] = await db.query(`
        SELECT produk.nama_produk as name, SUM(order_items.jumlah) as sold 
        FROM order_items 
        JOIN produk ON order_items.produk_id = produk.id 
        GROUP BY produk.id 
        ORDER BY sold DESC 
        LIMIT 5
    `);
    
    // 2. Menghitung Omzet Hari Ini
    const [rowsOmzet] = await db.query('SELECT SUM(total_harga) as omzet FROM orders WHERE DATE(created_at) = CURDATE()');
    const omzetHarian = rowsOmzet[0].omzet || 0;
    
    // 3. Menghitung Total Pesanan yang "Selesai"
    const [rowsSelesai] = await db.query('SELECT COUNT(id) as total FROM orders WHERE status_pesanan = "Selesai"');
    const totalSelesai = rowsSelesai[0].total || 0;
    
    // 4. Menghitung Rata-rata Nilai Orderan
    const [rowsRata] = await db.query('SELECT AVG(total_harga) as rata_rata FROM orders');
    const rataRataOrderan = rowsRata[0].rata_rata || 0;

    // 5. Kalkulasi Persentase Selesai
    const persentase = totalOrderan === 0 ? 0 : Math.round((totalSelesai / totalOrderan) * 100);

    // 6. TUGAS BARU: Cash Omzet Awal (Modal Laci Kasir)
    // Kita set default statis Rp 100.000 untuk tampilan awal kasir
    const cashOmzetAwal = 100000;

    return {
        cash_omzet_awal: cashOmzetAwal, // Output baru untuk cash awal
        total_order: totalOrderan,
        omzet_harian: Number(omzetHarian),
        persentase_selesai: persentase,
        rata_rata_orderan: Math.round(Number(rataRataOrderan)),
        top_menus: topMenus
    };
};

// Checklist 4: Tabel Order Terbaru (Dikembalikan lagi kodingannya)
exports.getRecentOrders = async () => {
    const [rows] = await db.query(`
        SELECT orders.id, orders.nama_pelanggan, GROUP_CONCAT(CONCAT(produk.nama_produk, ' x', order_items.jumlah) SEPARATOR ', ') as barang, orders.status_pesanan, orders.total_harga as total
        FROM orders
        JOIN order_items ON orders.id = order_items.order_id
        JOIN produk ON order_items.produk_id = produk.id
        GROUP BY orders.id
        ORDER BY orders.created_at DESC
        LIMIT 5
    `);
    return rows;
};