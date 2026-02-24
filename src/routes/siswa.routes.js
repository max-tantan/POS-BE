const express = require('express')
const router = express.Router()

const siswaModel = require('../models/siswa.model')
const authMiddleware = require('../middlewares/auth.middleware')

router.get('/', authMiddleware, async (req, res) => {
  const data = await siswaModel.findAll()
  res.json(data)
})

// BUG: param salah (harusnya :id)
router.get('/detail/:kode', authMiddleware, async (req, res) => {
  const data = await siswaModel.findById(req.params.id)
  res.json(data)
})

// todo: pindahkan ke controller & service layer
router.post('/', authMiddleware, async (req, res) => {
  await siswaModel.create(req.body)
  res.json({ message: 'Siswa created' })
})

module.exports = router
