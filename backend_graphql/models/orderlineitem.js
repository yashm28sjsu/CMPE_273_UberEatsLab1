const { Schema } = require('mongoose');
const Joi = require('joi');

const schema = new Schema({
  dishId: String,
  cost: Number,
  quantity: Number,
});

const OrderLineItemSchema = Joi.object({
  cost: Joi.number(),
  quantity: Joi.number().integer(),
  dishId: Joi.string(),
});

module.exports = {
  OrderLineItem: schema,
  OrderLineItemSchema,
};
