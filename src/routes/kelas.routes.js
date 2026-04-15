const express = require('express')
const router = express.Router()

const kelasController = require('../controllers/kelas.controller')
const authMiddleware = require('../middlewares/auth.middleware')

router.get('/', authMiddleware, kelasController.getAll)
router.get('/:kode_kelas', authMiddleware, kelasController.getById)
router.post('/', authMiddleware, kelasController.create)
router.put('/:id', authMiddleware, kelasController.update)
router.delete('/:id', authMiddleware, kelasController.delete)

module.exports = router
