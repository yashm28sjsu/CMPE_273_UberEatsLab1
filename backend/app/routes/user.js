const express = require('express');
const controllers = require('../controllers/user');

const router = express.Router();

router.post('/create', controllers.create);
router.post('/update', controllers.update);
router.post('/login', controllers.login);

module.exports = router;
