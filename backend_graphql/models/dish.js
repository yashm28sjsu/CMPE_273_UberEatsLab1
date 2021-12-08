const { Schema, model } = require('mongoose');
const Joi = require('joi');

const schema = new Schema({
  name: String,
  ingredients: String,
  cuisine: String,
  price: Number,
  description: String,
  image: String,
  category: String,
  type: String,
  restaurantId: String,
});

// eslint-disable-next-line new-cap
const Dish = new model('Dish', schema);

const DishSchema = Joi.object({

  id: Joi.string().allow(null),

  name: Joi.string()
    .min(3)
    .max(30)
    .regex(/^\w+(?:\s+\w+)*$/)
    .required(),

  ingredients: Joi.string().allow(null),

  cuisine: Joi.string().allow(null),

  price: Joi.number(),

  description: Joi.string(),

  image: Joi.string().allow(null, ''),

  category: Joi.string().allow(null),

  type: Joi.string().valid('VEG', 'VEGAN', '').allow(null),

  restaurantId: Joi.string(),

});

module.exports = {
  Dish,
  DishSchema,
};
