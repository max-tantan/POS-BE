const express = require('express')
const router = express.Router()

const siswaModel = require('../models/siswa.model')
const siswaController = require('../controllers/siswa.controller')
const authMiddleware = require('../middlewares/auth.middleware')

router.get('/', authMiddleware, async (req, res) => {
  const data = await siswaModel.findAll()
  res.json(data)
})


router.get('/detail/:id', authMiddleware, async (req, res) => {
  const data = await siswaModel.findById(req.params.id)
  res.json(data)
})

router.post('/', authMiddleware, siswaController.create)

router.put('/:id', authMiddleware, siswaController.update)

router.delete('/:id', authMiddleware, siswaController.delete)

module.exports = router
