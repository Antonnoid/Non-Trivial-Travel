'use strict';
const {Route_place} = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Route_place.bulkCreate([
      {
        routeId: 1,
        placeId: 1,
        order: 1,
      },
      {
        routeId: 1,
        placeId: 2,
        order: 2,
      },
      {
        routeId: 1,
        placeId: 3,
        order: 3,
      },
      {
        routeId: 2,
        placeId: 4,
        order: 1,
      },
      {
        routeId: 2,
        placeId: 5,
        order: 2,
      },
      {
        routeId: 2,
        placeId: 6,
        order: 3,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await Route_place.destroy({});
  },
};
