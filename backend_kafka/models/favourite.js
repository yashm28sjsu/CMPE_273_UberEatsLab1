const { Schema, model } = require('mongoose');
const Joi = require('joi');

const schema = new Schema({
  userId: String,
  restaurantId: String,
});

// eslint-disable-next-line new-cap
const Favourite = new model('Favourite', schema);

const FavouriteSchema = Joi.object({
  userId: Joi.string(),
  restaurantId: Joi.string(),
});

module.exports = {
  Favourite,
  FavouriteSchema,
};
