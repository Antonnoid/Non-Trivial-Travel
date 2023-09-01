'use strict';
const {Place} = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    Place.bulkCreate([
      {
        title: 'Юпитер 5. Ижевский паб',
        description: 'Говорят, Антоха работал. Одобряет.',
        rating: 4.2,
        isPublic: false,
        userId: 1,
        cityId: 2279,
        latitude: 56.8474321231524,
        longitude: 53.21050462850477,
      },
      {
        title: 'Пристань Ижевск',
        description: 'Паромный причал. Уплыть, приплыть - норм.',
        rating: 3.5,
        isPublic: false,
        userId: 1,
        cityId: 2279,
        latitude: 56.845431535307476,
        longitude: 53.18770251285661,
      },
      {
        title: 'Центральный рынок',
        description: 'Приехал в город и не сходил на рынок? Ууууу...',
        rating: 4.0,
        isPublic: false,
        userId: 1,
        cityId: 2279,
        latitude: 56.83932861692289,
        longitude: 53.21114602549753,
      },
      {
        title: 'Fast food',
        description: 'Позиционируют себя как ресторан',
        rating: 2.2,
        isPublic: false,
        userId: 2,
        cityId: 2033,
        latitude: 44.026349261594106,
        longitude: 43.068857888865914,
      },
      {
        title: 'Китайская беседка',
        description:
          'Китайская беседка, построенная в 1976 году на месте старого павильона, от которой открывается прекрасный вид.',
        rating: 4.8,
        isPublic: false,
        userId: 2,
        cityId: 2033,
        latitude: 44.03579100873387,
        longitude: 43.08295196730211,
      },
      {
        title: 'Провал',
        description: '12 стульев смотрели? Ну вот.',
        rating: 4.6,
        isPublic: false,
        userId: 2,
        cityId: 2033,
        latitude: 44.04742845769331,
        longitude: 43.09904850757495,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await Place.destroy({});
  },
};
