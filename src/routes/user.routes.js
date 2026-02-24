const express = require('express')
const router = express.Router()

const userController = require('../controllers/user.controller')
const authMiddleware = require('../middlewares/auth.middleware')

router.get('/', authMiddleware, userController.getAll)
router.get('/:id', authMiddleware, userController.getById)
router.delete('/:id', authMiddleware, userController.delete)

module.exports = router