'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      cost: {
        type: Sequelize.DECIMAL
      },
      deliverycost: {
        type: Sequelize.DECIMAL
      },
      tax: {
        type: Sequelize.DECIMAL
      },
      tax: {
        type: Sequelize.DECIMAL
      },
      totalcost: {
        type: Sequelize.DECIMAL
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Orders');
  }
};