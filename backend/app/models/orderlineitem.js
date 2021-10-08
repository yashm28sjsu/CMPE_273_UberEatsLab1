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
    static associate({ Order }) {
      this.belongsTo(Order, { foreignkey: 'order' });
    }
  }
  OrderLineItem.init({
    cost: DataTypes.DECIMAL,
    quantity: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'OrderLineItem',
  });
  return OrderLineItem;
};
