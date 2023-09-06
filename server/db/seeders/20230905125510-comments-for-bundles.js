'use strict';
const {Bundle_comment} = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Bundle_comment.bulkCreate([
      {
        userId: 1,
        bundleId: 2,
        text: 'Круто',
      },
      {
        userId: 2,
        bundleId: 2,
        text: 'Класс',
      },
      {userId: 2, bundleId: 2, text: 'Отлично!!!'},
    ]);
  },

  async down(queryInterface, Sequelize) {
    await Bundle_comment.destroy({});
  },
};
