"use strict";
var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
const secrets = require('../config/access.json');
const { User } = require('../models/user');
const { Restaurant } = require('../models/restaurant');

// Setup work and export for the JWT passport strategy
const setupPassport = () => {
  var opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
    secretOrKey: secrets.access_token_secret,
  };
  passport.use('user',
    new JwtStrategy(opts, (jwt_payload, callback) => {
      const user_id = jwt_payload.id;
      console.log();
      User.findById(user_id, (err, results) => {
        if (err) {
          return callback(err, false);
        }
        if (results) {
          callback(null, results);
        }
        else {
          callback(null, false);
        }
      });
    })
  )
  passport.use('restaurant',
    new JwtStrategy(opts, (jwt_payload, callback) => {
      const user_id = jwt_payload.id;
      console.log();
      Restaurant.findById(user_id, (err, results) => {
        if (err) {
          return callback(err, false);
        }
        if (results) {
          callback(null, results);
        }
        else {
          callback(null, false);
        }
      });
    })
  )
}

module.exports = {
  setupPassport,
  authenticateUser: passport.authenticate("user", { session: false }),
  authenticateRestaurant: passport.authenticate("restaurant", { session: false }),
}
