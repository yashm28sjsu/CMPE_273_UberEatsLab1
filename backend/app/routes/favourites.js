const express = require('express');
const controllers = require('../controllers/favourites');
const { authenticateToken } = require('../controllers/user');

const router = express.Router();

router.post('/create', authenticateToken, controllers.create);
router.post('/remove', authenticateToken, controllers.remove);
router.post('/getFavourites', authenticateToken, controllers.getFavourites);
router.post('/getFavouritesWithRestaurant', authenticateToken, controllers.getFavouritesWithRestaurant);

module.exports = router;
