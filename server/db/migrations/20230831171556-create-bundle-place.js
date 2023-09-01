'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Bundle_places', {
      bundleId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Bundles',
          key: 'id',
        },
      },
      placeId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Places',
          key: 'id',
        },
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Bundle_places');
  },
};
