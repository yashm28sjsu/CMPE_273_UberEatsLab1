const express = require('express');
const controllers = require('../controllers/user');

const router = express.Router();

router.post('/create', controllers.create);

module.exports = router;
