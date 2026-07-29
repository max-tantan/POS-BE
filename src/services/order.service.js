const orderModel = require('../models/order.model');
const crypto = require('crypto');

exports.createData = async (data) => {
    // Memvalidasi supaya data yang masuk tidak kosong
    if (!data.nama_pelanggan || !data.items || data.items.length === 0 || !data.total_harga) {
        const error = new Error('Data order tidak lengkap');
        error.status = 400;
        throw error;
    }

    const newOrder = {
        id: crypto.randomUUID(),
        nama_pelanggan: data.nama_pelanggan,
        items: data.items,
        total_harga: data.total_harga,
        status_pesanan: "Proses"
    }

    // SImpan data ke database lewat model
    await orderModel.create(newOrder);

    return newOrder;
}

exports.updateOrderData = async (id, data) => {
    // Note: status_pesanan update doesn't require items if it's just a status change
    if (!data.nama_pelanggan || !data.total_harga) {
        const error = new Error('Data update order tidak lengkap');
        error.status = 400;
        throw error;
    }
    await orderModel.update(id, data);
    return { id, ...data };
}

exports.deleteOrderData = async (id) => {
    await orderModel.delete(id);
    return true;
}