const Joi = require('joi');
const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Order }) {
      this.belongsTo(User, { foreignkey: 'user' });
      this.hasMany(Order, { as: 'orders' });
    }
  }

  Address.schema = Joi.object({

    id: Joi.number().allow(null),

    address: Joi.string(),

    UserId: Joi.number().integer(),

  });

  Address.init({
    address: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Address',
  });
  return Address;
};
