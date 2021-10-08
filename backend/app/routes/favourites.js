const express = require('express');
const controllers = require('../controllers/favourites');
const { authenticateToken } = require('../controllers/user');

const router = express.Router();

router.post('/create', authenticateToken, controllers.create);
router.post('/remove', authenticateToken, controllers.remove);

module.exports = router;
