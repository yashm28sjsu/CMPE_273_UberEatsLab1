const {
  Model,
} = require('sequelize');
const Joi = require('joi');

module.exports = (sequelize, DataTypes) => {
  class Restaurant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      this.belongsTo(User, { foreignKey: 'userId', as: 'owner' });
    }
  }

  Restaurant.schema = Joi.object({
    name: Joi.string()
      .min(3)
      .max(30)
      .regex(/^\w+(?:\s+\w+)*$/)
      .required(),

    tags: Joi.string()
      .regex(/(.+?)(?:,|$)/)
      .allow(null),

    address: Joi.string()
      .min(10)
      .max(100),

    starttime: Joi.string()
      .pattern(new RegExp('^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$'))
      .required(),

    endtime: Joi.string()
      .pattern(new RegExp('^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$'))
      .required(),

    location: Joi.object()
      .allow(null),

    description: Joi.string()
      .min(20)
      .max(100)
      .required(),

    rating: Joi.number()
      .integer()
      .min(1)
      .max(10),

    country: Joi.string()
      .valid('United States', 'India'),

    contact: Joi.string()
      .length(10)
      .pattern(/^[0-9]+$/)
      .required(),

    userId: Joi.number(),

  });

  Restaurant.init({
    name: DataTypes.STRING,
    tags: DataTypes.STRING,
    address: DataTypes.STRING,
    starttime: DataTypes.STRING,
    endtime: DataTypes.STRING,
    location: DataTypes.GEOMETRY('POINT'),
    description: DataTypes.STRING,
    rating: DataTypes.INTEGER,
    contact: DataTypes.STRING,
    country: DataTypes.STRING,
    userId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Restaurant',
  });
  return Restaurant;
};
