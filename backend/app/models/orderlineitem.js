const Joi = require('joi');
const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class OrderLineItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Order, Dish }) {
      this.belongsTo(Order, { foreignkey: 'order' });
      this.belongsTo(Dish, { foreignkey: 'dish' });
    }
  }

  OrderLineItem.schema = Joi.object({

    cost: Joi.number(),
    quantity: Joi.number().integer(),
    OrderId: Joi.number().integer(),
    DishId: Joi.number().integer(),

  });

  OrderLineItem.arraySchema = Joi.array().items(OrderLineItem.schema);

  OrderLineItem.init({
    cost: DataTypes.DECIMAL,
    quantity: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'OrderLineItem',
  });
  return OrderLineItem;
};
