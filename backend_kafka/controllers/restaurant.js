const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secrets = require('../config/access.json');
const topics = require('../topics');

const { Restaurant, RestaurantSchema } = require('../models/restaurant');

const EXPIRATION_TIME = '1h';

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

async function comparePassword(password, hashedPassword) {
  const isSame = await bcrypt.compare(password, hashedPassword);
  return isSame;
}

const create = async (data, callback) => {
  console.log(data);

  const hash = await hashPassword(data.password);
  const restaurant = { ...data, password: hash };

  const validation = RestaurantSchema.validate(restaurant);

  if (!validation.error) {
    try {
      const existing = await Restaurant.findOne({
        email: restaurant.email,
      }).exec();
      if (existing === null) {
        const dbrestaurant = new Restaurant(restaurant);
        dbrestaurant.save(restaurant, (error, saved) => {
          if (!error) {
            console.log(saved);
            const token = jwt.sign(
              // eslint-disable-next-line no-underscore-dangle
              { id: saved._id },
              secrets.access_token_secret,
              { expiresIn: EXPIRATION_TIME },
            );
            const { password, ...remaining } = saved.toJSON();
            // eslint-disable-next-line no-underscore-dangle
            callback(null, { restaurant: { ...remaining, type: 'RESTAURANT' }, token });
          } else {
            callback({ error }, null);
          }
        });
      } else {
        callback({
          error:
            'Account already exists for this email address. Please verify and try again.',
        }, null);
      }
    } catch (err) {
      console.log(err);
      callback({ error: err }, null);
    }
  } else {
    // console.log(validation.error);
    callback({ error: validation.error.details[0].message }, null);
  }
};

const update = async (restaurant, callback) => {
  // TODO: CHECK FOR EMAIL UPDATE DUPLICATION
  console.log(restaurant);

  const validation = RestaurantSchema.validate(restaurant);

  if (!validation.error) {
    try {
      Restaurant.findOneAndUpdate(
        { _id: restaurant.id },
        restaurant,
        { new: true },
        (error, updated) => {
          if (!error) {
            const { password, ...remaining } = updated.toJSON();
            callback(null, remaining);
          } else {
            callback(
              {
                error: 'Account already exists for this email address. Please verify and try again.',
              },
              null,
            );
          }
        },
      );
    } catch (err) {
      console.log(err);
      callback({ error: err }, null);
    }
  } else {
    callback({ error: validation.error }, null);
  }
};

const login = async (restaurant, callback) => {
  const email = restaurant.username;
  try {
    const existing = await Restaurant.findOne({
      email,
    });
    if (existing != null) {
      const match = await comparePassword(restaurant.password, existing.password);
      if (match) {
        const token = jwt.sign(
          { id: existing.id },
          secrets.access_token_secret,
          { expiresIn: EXPIRATION_TIME },
        );
        const {
          password,
          ...remaining
        } = existing.toJSON();
        callback(null, { restaurant: { ...remaining, type: 'RESTAURANT' }, token });
      } else {
        callback({ error: 'Restaurantname and/or Password are not correct. Please verify and try again.' }, null);
      }
    } else {
      callback({ error: 'Restaurant does not exist with given Email Address.' }, null);
    }
  } catch (err) {
    console.log(err);
    callback({ error: err }, null);
  }
};

const getAll = async (_data, callback) => {
  try {
    const restaurants = await Restaurant.find();
    callback(null, { restaurants });
  } catch (error) {
    console.log(error);
    callback({ error }, null);
  }
};

const handleRequest = (topic, body, callback) => {
  switch (topic) {
    case topics.RESTAURANT_CREATE:
      create(body, callback);
      break;
    case topics.RESTAURANT_UPDATE:
      update(body, callback);
      break;
    case topics.RESTAURANT_GETALL:
      getAll(body, callback);
      break;
    case topics.RESTAURANT_LOGIN:
      login(body, callback);
      break;
    default:
      break;
  }
};

module.exports = {
  handleRequest,
};
