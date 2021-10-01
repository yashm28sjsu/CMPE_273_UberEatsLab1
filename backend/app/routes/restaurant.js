const express = require('express');
const controllers = require('../controllers/restaurant');
// const { authenticateToken } = require('../controllers/user');

const router = express.Router();

router.post('/create', controllers.create);
router.post('/login', controllers.login);

module.exports = router;
