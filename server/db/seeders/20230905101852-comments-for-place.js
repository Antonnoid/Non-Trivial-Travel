'use strict';
const {Place_comment} = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Place_comment.bulkCreate([
      {
        userId: 2,
        placeId: 6,
        text: 'Круто',
      },
      {
        userId: 2,
        placeId: 6,
        text: 'Очень',
      },
      {
        userId: 1,
        placeId: 6,
        text: 'Был там',
      },
      {
        userId: 3,
        placeId: 6,
        text: 'Не был там',
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await Place_comments.destroy({});
  },
};
