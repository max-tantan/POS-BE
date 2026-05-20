const express = require('express')
const router = express.Router()
const orderController = require('../controllers/order.controller')
const authMiddleware = require('../middlewares/auth.middleware')

router.post('/', authMiddleware, orderController.createOrder)
router.get('/', authMiddleware, orderController.getOrder)
router.put('/:id, authMiddleware, orderController.updateOrder')
router.delete('/:id, authMiddleware, orderController.deleteOrder)')

module.exports = router