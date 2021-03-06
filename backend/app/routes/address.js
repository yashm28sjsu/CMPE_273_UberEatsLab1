const express = require('express');
const controllers = require('../controllers/address');
const { authenticateToken } = require('../controllers/user');

const router = express.Router();

router.post('/create', authenticateToken, controllers.create);
router.post('/update', authenticateToken, controllers.update);
router.post('/getAddresses', authenticateToken, controllers.getAddresses);

module.exports = router;
