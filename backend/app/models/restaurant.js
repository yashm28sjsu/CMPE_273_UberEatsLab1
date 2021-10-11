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
    static associate({ Dish, Order }) {
    //   this.belongsto(user, { foreignkey: 'userid', as: 'owner' });
      this.hasMany(Dish, { as: 'dishes' });
      this.hasMany(Order, { as: 'orders' });
    }
  }

  Restaurant.schema = Joi.object({
    name: Joi.string()
      .min(3)
      .max(30)
      .regex(/^\w+(?:\s+\w+)*$/)
      .required(),

    email: Joi.string()
      .email()
      .required(),

    password: Joi.string()
      .pattern(new RegExp('[a-z0-9-]+[0-9A-Za-z./+=,$-]+$')),

    tags: Joi.string()
      .regex(/(.+?)(?:,|$)/)
      .allow(null),

    address: Joi.string()
      .min(10)
      .max(100),

    starttime: Joi.string()
      .pattern(new RegExp('^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$'))
      .allow(null),

    endtime: Joi.string()
      .pattern(new RegExp('^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$'))
      .allow(null),

    location: Joi.object()
      .allow(null),

    description: Joi.string()
      .min(20)
      .max(100)
      .allow(null),

    rating: Joi.number()
      .integer()
      .min(1)
      .max(10)
      .allow(null),

    country: Joi.string()
      .valid('United States', 'India'),

    contact: Joi.string()
      .length(10)
      .pattern(/^[0-9]+$/)
      .required(),

    picture: Joi.string().uri().allow(null),

    deliveryMode: Joi.string().valid('', 'DELIVERY', 'PICKUP'),

    type: Joi.string().valid('', 'VEG', 'VEGAN'),

  });

  Restaurant.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    tags: DataTypes.STRING,
    type: DataTypes.STRING,
    deliveryMode: DataTypes.STRING,
    address: DataTypes.STRING,
    starttime: DataTypes.STRING,
    endtime: DataTypes.STRING,
    location: DataTypes.GEOMETRY('POINT'),
    description: DataTypes.STRING,
    rating: DataTypes.INTEGER,
    contact: DataTypes.STRING,
    country: DataTypes.STRING,
    picture: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Restaurant',
  });
  return Restaurant;
};
