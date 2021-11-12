const { Schema, model } = require('mongoose');
const Joi = require('joi');

const schema = new Schema({
  userId: String,
  name: String,
  address: String,
});

// eslint-disable-next-line new-cap
const Address = new model('Address', schema);

const AddressSchema = Joi.object({

  id: Joi.string().allow(null),

  name: Joi.string(),

  address: Joi.string(),

  userId: Joi.string(),

});

module.exports = {
  Address,
  AddressSchema,
};
