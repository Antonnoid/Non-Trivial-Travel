'use strict';
const {Route_comment} = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Route_comment.bulkCreate([
      {
        userId: 1,
        routeId: 2,
        text: 'Круто',
      },
      {
        userId: 2,
        routeId: 2,
        text: 'Патрулирование прошло успешно',
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await Route_comment.destroy({});
  },
};
