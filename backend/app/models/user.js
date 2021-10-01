const { Model } = require('sequelize');
const Joi = require('joi');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // static associate({ Restaurant }) {
    //   this.hasMany(Restaurant, { foreignKey: 'userId', as: 'restaurants' });
    // }
  }

  User.schema = Joi.object({
    id: Joi.number(),

    firstname: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required(),

    lastname: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required(),

    nickname: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .allow(null),

    password: Joi.string()
      .pattern(new RegExp('[a-z0-9-]+[0-9A-Za-z./+=,$-]+$')),

    email: Joi.string()
      .email()
      .required(),

    profile_picture: Joi.string()
      .dataUri()
      .allow(null),

    dob: Joi.string()
      .isoDate()
      .allow(null),

    country: Joi.string()
      .valid('United States', 'India'),

    contact: Joi.string()
      .length(10)
      .pattern(/^[0-9]+$/)
      .required(),
  });

  User.init({
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    profile_picture: DataTypes.STRING,
    dob: DataTypes.DATE,
    nickname: DataTypes.STRING,
    contact: DataTypes.STRING,
    country: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
