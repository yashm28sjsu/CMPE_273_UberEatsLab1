const {
  Model,
} = require('sequelize');
const Joi = require('joi');

module.exports = (sequelize, DataTypes) => {
  class Dish extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Restaurant }) {
      this.belongsTo(Restaurant, { foreignkey: 'restaurant' });
    }
  }

  Dish.schema = Joi.object({

    id: Joi.number().allow(null),

    name: Joi.string()
      .min(3)
      .max(30)
      .regex(/^\w+(?:\s+\w+)*$/)
      .required(),

    ingredients: Joi.string().allow(null),

    cuisine: Joi.string().allow(null),

    price: Joi.number(),

    description: Joi.string(),

    image: Joi.string().allow(null),

    category: Joi.string().allow(null),

    type: Joi.string().valid('VEG', 'VEGAN', '').allow(null),

    RestaurantId: Joi.number().integer(),

  });

  Dish.init({
    name: DataTypes.STRING,
    ingredients: DataTypes.STRING,
    cuisine: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    description: DataTypes.STRING,
    image: DataTypes.STRING,
    category: DataTypes.STRING,
    type: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Dish',
  });
  return Dish;
};
