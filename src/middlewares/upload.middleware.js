const multer = require('multer');
const path = require('path');

// Mengatur tempat pemyimpanan dan nama file
const storage = multer.memoryStorage({
    destination: function(req, file, cb) {
        // Arahkan ke folder publis/uploads yang sudah ada
        cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
        // Mengganti nama file agar unik: TanggalHariINi-NamaAsli.jpg
        // Supaya mencegah error kalau ada 2 produk dengan nama foto yang sama
        const uniqueSuffix = Date.now() + '_' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + path.extname(file.originalname))
    }
});

// Membuat filter (supaya hanya menerima gambar saja)
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/
    // Mengecek tipe asli file dan ekstensinya (.jpg, .png)
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase())
    const mimeType = allowedTypes.test(file.mimetype)

    if (extname && mimeType) {
        cb(null, true)
    } else {
        cb(new Error('Hanya diperbolehkan mengupload file gambar (jpeg, jpg, png)'))
    }
}

// Membungkus pengaturan multer
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 }, // Batas ukuran file 5MB
    fileFilter: fileFilter
});

module.exports = upload