'use strict';
const {Route} = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Route.bulkCreate([
      {
        title: 'По Ижевску на ИЖе',
        description: 'Маршрут по нетуристическим местам на ИЖ Юпитер-5',
        time: '2 часа',
        rating: '5.0',
        isPublic: true,
        userId: 1,
        cityId: 2279,
      },
      {
        title: 'Попатрулируй Пятигорск!',
        description: 'Злачные места для доходного патрулирования',
        time: '8 часов',
        rating: '5.0',
        isPublic: true,
        userId: 2,
        cityId: 2033,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await Route.destroy({});
  },
};
