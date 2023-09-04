'use strict';
const {Bundle_place} = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Bundle_place.bulkCreate([
      {
        bundleId: 1,
        placeId: 1,
      },
      {
        bundleId: 1,
        placeId: 2,
      },
      {
        bundleId: 1,
        placeId: 3,
      },
      {
        bundleId: 2,
        placeId: 4,
      },
      {
        bundleId: 2,
        placeId: 5,
      },
      {
        bundleId: 2,
        placeId: 6,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await Bundle_place.destroy({});
  },
};
