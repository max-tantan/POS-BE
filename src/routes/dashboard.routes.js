const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboard.controller');
const authmiddleware = require('..middlewares/auth.middleware');

router.get('/charts', authmiddleware, dashboardController.getChartData);

module.exports = router;

