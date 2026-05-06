const dashboardModel = require('../models/dashboard.model.js');

exports.getChartData = async (req, res, next) => {
    try{

        const [dailyOrders, statusCount] = await Promise.all([
            dashboardModel.getDailyOrders(),
            dashboardModel.getOrdersStatusCount()
        ]);


        res.status(200).json({
             status: 'succes',
             message: 'Berhasil mengambil data untuk chart dashboard',
             data: {
                chart_harian: dailyOrders,
                chart_status: statusCount
             }
         });    
} catch (error) {
    next(error);
}
};

// CODE AHMAD
exports.getSummaryData = async (req, res, next) => {
    try {
        const [summary, recentOrders] = await Promise.all ([
            dashboardModel.getSummary(),
            dashboardModel.getRecentOrders
        ]);

        res.status(200).json({
            status: 'success',
            message: 'Berhasil Mengambil data ringkasan dashboard',
            data: {
                ringkasan: summary,
                order_terbary: recentOrders
            }
        });
    } catch (error) {
        next(error);
    }
};