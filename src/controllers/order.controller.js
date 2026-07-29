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

exports.updateOrder = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updateOrder = await orderService.updateOrderData(id, req.body);

        res.status(200).json({
            status: 'Success',
            message: 'Berhasil mengubah data pesanan',
            data: updateOrder
        });
    } catch (error) {
        next(error);
    }
};

exports.deleteOrder = async (req, res, next) => {
    try {
        const { id } = req.params;
        await orderService.deleteOrderData(id);

        res.status(200).json({
            status: 'Success',
            message: 'Berhasil menghapus data pesanan'
        });
    } catch (error) {
        next(error);
        }
};