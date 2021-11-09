const { Schema, model } = require('mongoose');
const Joi = require('joi');

const schema = new Schema({
  firstname: String,
  lastname: String,
  nickname: String,
  password: String,
  email: String,
  profile_picture: String,
  dob: String,
  country: String,
  contact: String,
});

// eslint-disable-next-line new-cap
const User = new model('User', schema);

const UserSchema = Joi.object({
  id: Joi.string(),

  firstname: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),

  lastname: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),

  nickname: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .allow(null),

  password: Joi.string()
    .pattern(new RegExp('[a-z0-9-]+[0-9A-Za-z./+=,$-]+$')),

  email: Joi.string()
    .email()
    .required(),

  profile_picture: Joi.string()
    .dataUri()
    .allow(null),

  dob: Joi.string()
    .isoDate()
    .allow(null),

  country: Joi.string()
    .valid('United States', 'India'),

  contact: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required(),
});

module.exports = {
  User,
  UserSchema,
};
