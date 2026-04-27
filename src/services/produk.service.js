const produkModel = require('../models/produk.model');
const crypto = require('crypto'); //Untuk membuat sebuah id unik

exports.createData = async (data, file) => {
    // Mengecek apakah ada data wajib yang kosonh
    if (!data.nama_produk || !data.harga_produk || !data.jenis_produk) {
        const error = new Error('INVALID_PAYLOAD');
        error.statusCode = 400;
        throw error;
    }

    // Menguji TS3: mencegah supaya produk duplikat
    const existingProduk = await produkModel.getByName(data.nama_produk);
    if (existingProduk) {
        const error = new Error('Produk duplikat! Nama produk ini sudah ada di database.');
        error.statusCode = 409; // Conflict
        throw error;
    }

    // Menyimpan ID unik dan file foto
    const id = crypto.randomUUID();

    // Kalo ada file foto yang dikirim, ambil nama filenya. Jika tidak, biarkan null
    const foto_produk = file ? file.filename : null;

    const newData = {
        id,
        nama_produk: data.nama_produk,
        harga_produk: data.harga_produk,
        jenis_produk: data.jenis_produk,
        foto_produk: foto_produk
    }

    // Simpan data ke database
    await produkModel.create(newData);
    return newData;
}