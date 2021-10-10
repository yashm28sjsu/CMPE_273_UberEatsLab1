const {
  Model,
} = require('sequelize');
const Joi = require('joi');

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({
      User, Restaurant, Address, OrderLineItem,
    }) {
      this.belongsTo(User, { foreignkey: 'user' });
      this.belongsTo(Restaurant, { foreignkey: 'restaurant' });
      this.belongsTo(Address, { foreignkey: 'address' });
      this.hasMany(OrderLineItem, { as: 'orderlineitems' });
    }
  }

  Order.schema = Joi.object({

    id: Joi.number().integer().allow(null),

    status: Joi.string().valid('PLACED', 'ACCEPTED', 'COOKING', 'PICKEDUP', 'DELIVERED', 'CANCELLED'),

    type: Joi.string().valid('PICKUP', 'DELIVERY'),

    cost: Joi.number(),

    deliverycost: Joi.number(),

    tax: Joi.number(),

    totalcost: Joi.number(),

    UserId: Joi.number().integer(),
    RestaurantId: Joi.number().integer().allow(null),
    AddressId: Joi.number().integer().allow(null),

  });

  Order.init({
    status: DataTypes.STRING,
    type: DataTypes.STRING,
    cost: DataTypes.DECIMAL,
    deliverycost: DataTypes.DECIMAL,
    tax: DataTypes.DECIMAL,
    totalcost: DataTypes.DECIMAL,
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};
