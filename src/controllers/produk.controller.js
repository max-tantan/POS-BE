const produkService = require('../services/produk.service');
const sharp = require('sharp'); // Tambahkan pemanggilan modul sharp
const path = require('path');
const fs = require('fs');

exports.createProduk = async (req, res) => {
    try {
        // Awal proses kompresi sharp
        if (req.file) {
            //  BIkin nama file unik dengan ekstensi .webp
            const uniqueSuffix = Date.now() + '_' + Math.round(Math.random() * 1E9);
            const namaFileBaru = uniqueSuffix + '.webp';
            
            // Menentukan lokasi disimpan ke folder public/uploads
            const lokasiSimpan = path.join(process.cwd(), 'public/uploads', namaFileBaru);

            // Mengeksekusi kompresi (Ubah ukuran maks lebar 800px dan ubah ke webp)
            await sharp(req.file.buffer)
                .resize({ width: 800 })
                .webp({ quality: 80 })
                .toFile(lokasiSimpan);

            // 4. Manipulasi req.file.filename supaya bisa dibaca oleh file service
            req.file.filename = namaFileBaru; 
        }

        // req.body akan berisi teks (nama, harga, jenis)
        // req.file akan berisi informasi foto yang sudah dikompres
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