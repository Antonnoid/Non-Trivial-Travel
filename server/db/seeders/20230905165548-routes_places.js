'use strict';
const {Route_place} = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Route_place.bulkCreate([
      {
        routeId: 1,
        placeId: 1,
      },
      {
        routeId: 1,
        placeId: 2,
      },
      {
        routeId: 1,
        placeId: 3,
      },
      {
        routeId: 2,
        placeId: 4,
      },
      {
        routeId: 2,
        placeId: 5,
      },
      {
        routeId: 2,
        placeId: 6,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await Route_place.destroy({});
  },
};
