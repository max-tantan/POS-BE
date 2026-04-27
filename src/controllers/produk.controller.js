const produkService = require('../services/produk.service');

exports.createProduk = async (req, res) => {
    try {
        // req.body akan berisi teks (nama, harga, jenis)
        // req.file akan berisi informasi foto yang berhasil diupload oleh multer
        const produk = await produkService.createData(req.body, req.file);

        res.status(201).json({
            status: 'success',
            message: 'produk berhasil ditambah',
            data: produk
        });
    } catch (error) {
        res.status(error.status || 500).json({
            status: 'error',
            statusCode: error.statusCode || 500,
            message: error.message || 'Terjadi kesalahan pada server'
        });
    };
}