const userTypeDefs = require('./user');
const restaurantTypeDefs = require('./restaurant');
const dishTypeDefs = require('./dish');
const addressTypeDefs = require('./address');
const favouriteTypeDefs = require('./favourite');
const orderTypeDefs = require('./order');

module.exports = [
    userTypeDefs,
    restaurantTypeDefs,
    dishTypeDefs,
    addressTypeDefs,
    favouriteTypeDefs,
    orderTypeDefs,
];