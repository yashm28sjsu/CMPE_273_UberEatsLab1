const jwt = require('jsonwebtoken');
const db = require('../models');
const secrets = require('../config/access.json');
const userControllers = require('./user');

const EXPIRATION_TIME = '1h';

const create = async (req, res) => {
  const restaurant = req.body;
  console.log(restaurant);

  const hash = await userControllers.hashPassword(restaurant.password);
  restaurant.password = hash;

  const validation = db.Restaurant.schema.validate(restaurant);

  if (!validation.error) {
    try {
      const existing = await db.Restaurant.findOne({
        attributes: ['id'],
        where: {
          email: restaurant.email,
        },
      });
      console.log(`QUERY: ${existing}`);
      if (existing === null) {
        const dbrestaurant = await db.Restaurant.create(restaurant);
        console.log(dbrestaurant);
        const token = jwt.sign(
          { id: dbrestaurant.id },
          secrets.access_token_secret,
          { expiresIn: EXPIRATION_TIME },
        );
        const {
          createdAt, updatedAt, password, ...remaining
        } = dbrestaurant.dataValues;
        res.json({ user: { ...remaining, type: 'RESTAURANT' }, token });
      } else {
        res.json({
          error:
            'Account already exists for this email address. Please verify and try again.',
        });
      }
    } catch (err) {
      console.log(err);
      res.status(200).json({ error: err });
    }
  } else {
    // console.log(validation.error);
    res.status(200).json({ error: validation.error.details[0].message });
  }
};

const login = async (req, res) => {
  const email = req.body.username;
  try {
    const existing = await db.Restaurant.findOne({
      where: { email },
    });
    if (existing != null) {
      const match = await userControllers.comparePassword(req.body.password, existing.password);
      if (match) {
        const token = jwt.sign(
          { id: existing.id },
          secrets.access_token_secret,
          { expiresIn: EXPIRATION_TIME },
        );
        const {
          password,
          createdAt,
          updatedAt,
          ...user
        } = existing.dataValues;
        res.json({ user: { ...user, type: 'RESTAURANT' }, token });
      } else {
        res.json({ error: 'Username and/or Password are not correct. Please verify and try again.' });
      }
    } else {
      res.json({ error: 'User does not exist with given Email Address.' });
    }
  } catch (err) {
    console.log(err);
    res.status(200).json({ error: err });
  }
};

const getAll = async (_req, res) => {
  const restaurants = await db.Restaurant.findAll({
    attributes: ['id', 'name', 'picture', 'description', 'tags'],
  });
  res.json({ restaurants });
};

module.exports = {
  create,
  login,
  getAll,
};
