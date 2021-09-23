module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Restaurants', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      tags: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.STRING,
      },
      starttime: {
        type: Sequelize.STRING,
      },
      endtime: {
        type: Sequelize.STRING,
      },
      location: {
        type: Sequelize.GEOMETRY,
      },
      description: {
        type: Sequelize.STRING,
      },
      rating: {
        type: Sequelize.NUMBER,
      },
      contact: {
        type: Sequelize.STRING,
      },
      country: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface/* , Sequelize */) => {
    await queryInterface.dropTable('Restaurants');
  },
};
