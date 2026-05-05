const orderService = require('../services/order.service');
const orderModel = require('../models/order.model');

exports.createOrder = async (req, res, next) => {
    try {
        const order = await orderService.createData(req.body);
        res.status(201).json({
            status: 'success',
            data: order
        })
    } catch (error) {
        next(error) //lempar error bawaan express acu
    }
}

exports.getOrder = async (req, res, next) => {
    try {
        const orders = await orderModel.getAll()
        res.status(200).json({
            status: 'success',
            message: 'Berhasil Mengambil data pesanan',
            data: orders
        })
    } catch (error) {
        next(error)
    }
}