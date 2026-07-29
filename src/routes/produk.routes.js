const express = require('express');
const router = express.Router();

const produkController = require ('../controllers/produk.controller');
const authMiddleware = require ('../middlewares/auth.middleware');
const upload = require ('../middlewares/upload.middleware');

// Gunakan upload.single('foto produk') untuk menerima 1 file gambar
router.post('/', authMiddleware, upload.single('foto_produk'), produkController.createProduk);
router.get('/', authMiddleware, produkController.getProduk);
router.put('/:id', authMiddleware, upload.single('foto_produk'), produkController.updateProduk);

module.exports = router;