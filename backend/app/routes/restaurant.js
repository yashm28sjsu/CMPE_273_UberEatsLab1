const express = require('express');
const controllers = require('../controllers/restaurant');
// const { authenticateToken } = require('../controllers/user');

const router = express.Router();

router.post('/create', controllers.create);
router.post('/login', controllers.login);
router.get('/getAll', controllers.getAll);

module.exports = router;
