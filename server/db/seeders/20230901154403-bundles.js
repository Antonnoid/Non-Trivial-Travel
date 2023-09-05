'use strict';
const {Bundle} = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Bundle.bulkCreate([
      {
        title: 'Подборочка. Ижевск',
        description: 'Я здесь был, пиво пил',
        rating: '5.0',
        isPublic: true,
        userId: 1,
        cityId: 2279,
      },
      {
        title: 'Опасно. Пятигорск',
        description: 'Не ходи здесь... без меня',
        rating: '5.0',
        isPublic: true,
        userId: 2,
        cityId: 2033,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await Bundle.destroy({});
  },
};
