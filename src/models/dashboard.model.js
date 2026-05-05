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