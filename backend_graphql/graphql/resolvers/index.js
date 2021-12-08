const _ = require('lodash');
const userResolvers = require('./user');
const restaurantResolvers = require('./restaurant');
const dishResolvers = require('./dish');
const addressResolvers = require('./address');
const favouriteResolvers = require('./favourite');
const orderResolvers = require('./order');

module.exports = _.merge(
    {},
    userResolvers,
    restaurantResolvers,
    dishResolvers,
    addressResolvers,
    favouriteResolvers,
    orderResolvers,
);
