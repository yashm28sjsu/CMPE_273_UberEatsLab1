const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { OrderLineItemSchema, OrderLineItem } = require('./orderlineitem');

const schema = new Schema({
  status: String,
  type: String,
  cost: Number,
  deliverycost: Number,
  tax: Number,
  totalcost: Number,
  userId: String,
  restaurantId: String,
  addressId: String,
  lineitems: [OrderLineItem],
});

// eslint-disable-next-line new-cap
const Order = new model('Order', schema);

const OrderSchema = Joi.object({

  id: Joi.string().allow(null),

  status: Joi.string().valid('PLACED', 'ACCEPTED', 'COOKING', 'PICKEDUP', 'DELIVERED', 'CANCELLED'),

  type: Joi.string().valid('PICKUP', 'DELIVERY'),

  cost: Joi.number(),

  deliverycost: Joi.number(),

  tax: Joi.number(),

  totalcost: Joi.number(),

  lineitems: Joi.array().items(OrderLineItemSchema),

  userId: Joi.string(),
  restaurantId: Joi.string(),
  addressId: Joi.string(),

});

module.exports = {
  Order,
  OrderSchema,
};
