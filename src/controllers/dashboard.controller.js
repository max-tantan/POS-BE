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