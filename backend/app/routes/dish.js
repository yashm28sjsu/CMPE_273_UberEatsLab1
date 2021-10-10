const express = require('express');
const controllers = require('../controllers/dish');
const { authenticateToken } = require('../controllers/user');

const router = express.Router();

router.post('/create', authenticateToken, controllers.create);
router.post('/update', authenticateToken, controllers.update);
router.get('/getDishes/:restaurantid', controllers.getDishes);

module.exports = router;
