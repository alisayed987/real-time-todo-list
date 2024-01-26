'use strict';
const moment = require('moment');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Get the user Id to be added as FK
     */
    let [results, metadata] = await queryInterface.sequelize.query('SELECT * FROM Users WHERE email="ali.sayed11298@gmail.com"')
    const userId = results[0]?.id;

    /**
     * Get all statuses Ids to be added as FKs
     */
    [results, metadata] = await queryInterface.sequelize.query('SELECT * FROM Statuses')
    const statuses = results;

    await queryInterface.bulkInsert('Tasks', [{
      title: 'task 1',
      description: 'todo first task with cancelled status',
      userId: userId,
      statusId: statuses.filter((e)=> e.name == 'cancelled')[0].id,
      createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
    },
    {
      title: 'task 2',
      description: 'todo second task with inprogress status',
      userId: userId,
      statusId: statuses.filter((e)=> e.name == 'inprogress')[0].id,
      createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
    },{
      title: 'task 3',
      description: 'todo 3rd task with completed status',
      userId: userId,
      statusId: statuses.filter((e)=> e.name == 'completed')[0].id,
      createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
    },{
      title: 'task 4',
      description: 'todo 4th task with on hold status',
      userId: userId,
      statusId: statuses.filter((e)=> e.name == 'hold')[0].id,
      createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
    }]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Tasks', null, {});
  }
};
