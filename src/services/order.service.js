const orderModel = require('../models/order.model');
const crypto = require('crypto');1

exports.createData = async (data) => {
    // Memvalidasi supaya data yang masuk tidak kosong
    if (!data.nama_pelanggan || !data.produk_id || !data.jumlah || !data.total_harga) {
        const error = new Error('Data order tidak lengkap');
        error.status = 400;
        throw error;
    };

    const newOrder = {
        id: crypto.randomUUID(),
        nama_pelanggan: data.nama_pelanggan,
        produk_id: data.produk_id,
        jumlah: data.jumlah,
        total_harga: data.total_harga,
        status_pesanan: "Proses"
    }

    // SImpan data ke database lewat model
    await orderModel.create(newOrder);

    return newOrder;
}