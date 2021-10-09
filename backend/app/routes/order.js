const express = require('express');
const controllers = require('../controllers/order');
const { authenticateToken } = require('../controllers/user');

const router = express.Router();

router.post('/create', authenticateToken, controllers.create);
router.post('/updateStatus', authenticateToken, controllers.updateStatus);

module.exports = router;
