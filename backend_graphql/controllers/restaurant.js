const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secrets = require('../config/access.json');

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

const create = async (data) => {
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
        const saved = await dbrestaurant.save(restaurant);
        console.log(saved);
        const token = jwt.sign(
          // eslint-disable-next-line no-underscore-dangle
          { id: saved._id },
          secrets.access_token_secret,
          { expiresIn: EXPIRATION_TIME },
        );
        const { password, ...remaining } = saved.toJSON();
        // eslint-disable-next-line no-underscore-dangle
        return { restaurant: { ...remaining, type: 'RESTAURANT' }, token };
      } else {
        return {
          error:
            'Account already exists for this email address. Please verify and try again.',
        };
      }
    } catch (err) {
      console.log(err);
      return { error: err };
    }
  } else {
    // console.log(validation.error);
    return { error: validation.error.details[0].message };
  }
};

const update = async (restaurant, callback) => {
  // TODO: CHECK FOR EMAIL UPDATE DUPLICATION
  console.log(restaurant);

  try {
    const updated = await Restaurant.findOneAndUpdate(
      { _id: restaurant.id },
      restaurant,
      { new: true }
    );
    const { password, ...remaining } = updated.toJSON();
    return { restaurant: remaining };
  } catch (err) {
    console.log(err);
    return { error: err };
  }
};

const login = async (restaurant) => {
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
        return { restaurant: { ...remaining, type: 'RESTAURANT' }, token };
      } else {
        return { error: 'Restaurantname and/or Password are not correct. Please verify and try again.' };
      }
    } else {
      return { error: 'Restaurant does not exist with given Email Address.' };
    }
  } catch (err) {
    console.log(err);
    return { error: err };
  }
};

const getAll = async (_data, callback) => {
  try {
    const restaurants = await Restaurant.find();
    return { restaurants };
  } catch (error) {
    console.log(error);
    return { error };
  }
};

module.exports = {
  create,
  update,
  login,
  getAll,
};
