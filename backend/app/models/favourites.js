const Joi = require('joi');
const {
  Model,
} = require('sequelize');

// eslint-disable-next-line no-unused-vars
module.exports = (sequelize, DataTypes) => {
  class Favourites extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Restaurant }) {
      this.belongsTo(User, { foreignkey: 'user' });
      this.belongsTo(Restaurant, { foreignkey: 'restaurant' });
    }
  }

  Favourites.schema = Joi.object({
    UserId: Joi.number().integer(),
    RestaurantId: Joi.number().integer(),
  });

  Favourites.init({
  }, {
    sequelize,
    modelName: 'Favourites',
  });
  return Favourites;
};
