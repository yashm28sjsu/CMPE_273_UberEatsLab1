const express = require('express');
const controllers = require('../controllers/order');
const { authenticateToken } = require('../controllers/user');

const router = express.Router();

router.post('/create', authenticateToken, controllers.create);
router.post('/updateStatus', authenticateToken, controllers.updateStatus);
router.post('/getOrders', authenticateToken, controllers.getOrders);

module.exports = router;
