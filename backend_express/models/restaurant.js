const { Schema, model } = require('mongoose');
const Joi = require('joi');

const schema = new Schema({
  name: String,
  email: String,
  tags: String,
  password: String,
  picture: String,
  description: String,
  country: String,
  contact: String,
  type: String,
  deliveryMode: String,
  address: String,
  starttime: String,
  endtime: String,
  rating: Number,
});

// eslint-disable-next-line new-cap
const Restaurant = new model('Restaurant', schema);

const RestaurantSchema = Joi.object({
  id: Joi.string().allow(null),

  name: Joi.string()
    .min(3)
    .max(30)
    .regex(/^\w+(?:\s+\w+)*$/)
    .required(),

  email: Joi.string()
    .email()
    .required(),

  password: Joi.string()
    .pattern(new RegExp('[a-z0-9-]+[0-9A-Za-z./+=,$-]+$')),

  tags: Joi.string()
    .regex(/(.+?)(?:,|$)/)
    .allow(null),

  address: Joi.string()
    .min(10)
    .max(100),

  starttime: Joi.string()
    .pattern(new RegExp('^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$'))
    .allow(null),

  endtime: Joi.string()
    .pattern(new RegExp('^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$'))
    .allow(null),

  description: Joi.string()
    .min(20)
    .max(100)
    .allow(null),

  rating: Joi.number()
    .integer()
    .min(1)
    .max(10)
    .allow(null),

  country: Joi.string()
    .valid('United States', 'India'),

  contact: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required(),

  picture: Joi.string().uri().allow(null),

  deliveryMode: Joi.string().valid('', 'DELIVERY', 'PICKUP'),

  type: Joi.string().valid('', 'VEG', 'VEGAN'),

});

module.exports = {
  Restaurant,
  RestaurantSchema,
};
