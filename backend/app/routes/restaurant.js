const express = require('express');
const controllers = require('../controllers/restaurant');
const { authenticateToken } = require('../controllers/user');

const router = express.Router();

router.post('/create', authenticateToken, controllers.create);

module.exports = router;
