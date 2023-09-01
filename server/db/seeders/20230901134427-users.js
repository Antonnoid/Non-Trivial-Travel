'use strict';
const { User } = require('../models');
const bcrypt = require('bcrypt')


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await User.bulkCreate([
      {
        name: 'Антон',
        email: 'anton_b@mail.ru',
        password: await bcrypt.hash('123', 10),
        cityId: 2279,
        isAdmin: true,
      },
      {
        name: 'Антон',
        email: 'anton_i@mail.ru',
        password: await bcrypt.hash('123', 10),
        cityId: 2033,
      },
      {
        name: 'Сергей',
        email: 'serega@mail.ru',
        password: await bcrypt.hash('123', 10),
        cityId: 409,
      },
      {
        name: 'Глеб',
        email: 'gleb@mail.ru',
        password: await bcrypt.hash('123', 10),
        cityId: 2170,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await User.destroy({});
  },
};
