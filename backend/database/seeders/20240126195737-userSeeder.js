'use strict';
const moment = require('moment');
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const salt = await bcrypt.genSalt(10);
    await queryInterface.bulkInsert('Users', [{
      name: 'Ali Sayed Ali',
      email: 'ali.sayed11298@gmail.com',
      password: await bcrypt.hash("password", salt),
      createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
    }]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
