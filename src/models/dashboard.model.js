const db = require('../config/db');

exports.getDailyOrders = async () => {
    const [rows] = await db.query(`
      SLECT DATE(created_at) as tanggal, COUNT(id) as total order
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
            GROUP BY status
            `);
            return rows ;
    };

    // CODE AHMAD 
    // (Checklist 1): Data Ringkasan (Omzet, Persentase, dll)
exports.getSummary = async () => {
    // 1. Menghitung Total Orderan
    const [rowsTotal] = await db.query('SELECT COUNT(id) as total FROM orders');
    const totalOrderan = rowsTotal[0].total || 0;
    
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

    return {
        total_order: totalOrderan,
        omzet_harian: Number(omzetHarian),
        persentase_selesai: persentase,
        rata_rata_orderan: Math.round(Number(rataRataOrderan))
    };
};