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

exports.updateOrder = async (id, data) => {
    if (!data.nama_pelanggan || !data.produk_id || !data.jumlah || !data.total_harga) {
        const error = new Error('Data update order tidak lengkap');
        error.status = 400;
        throw error;
    }
    await orderModel.update(id, data);
    return { id, ...data };
}

exports.deleteOrder = async (id) => {
    await orderModel.delete(id);
    return true;
}