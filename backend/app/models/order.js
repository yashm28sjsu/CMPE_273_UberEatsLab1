const {
  Model,
} = require('sequelize');

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
