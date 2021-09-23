const { Model } = require('sequelize');
const Joi = require('joi');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Restaurant }) {
      this.hasMany(Restaurant, { foreignKey: 'userId', as: 'restaurants' });
    }
  }

  User.schema = Joi.object({
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
      .max(30),

    password: Joi.string()
      .min(6)
      .max(18)
      .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

    email: Joi.string()
      .email()
      .required(),

    profile_picture: Joi.string()
      .dataUri()
      .allow(null),

    dob: Joi.string()
      .isoDate()
      .required()
      .allow(null),

    country: Joi.string()
      .valid('United States', 'India'),

    contact: Joi.string()
      .length(10)
      .pattern(/^[0-9]+$/)
      .required(),

    type: Joi.string().required(),
  });

  User.init({
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    type: DataTypes.STRING,
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
