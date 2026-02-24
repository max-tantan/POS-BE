const express = require('express')
const router = express.Router()

const kelasController = require('../controllers/kelas.controller')
const authMiddleware = require('../middlewares/auth.middleware')

router.get('/', authMiddleware, kelasController.getAll)
router.get('/:kode_kelas', authMiddleware, kelasController.getById)
router.post('/', authMiddleware, kelasController.create)
router.put('/:kode_kelas', authMiddleware, kelasController.update)
router.delete('/:kode_kelas', authMiddleware, kelasController.delete)

module.exports = router
