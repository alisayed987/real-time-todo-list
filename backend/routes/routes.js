const express = require('express');
const auth = require('./auth');

const error = require('../middlewares/error');

const tasks = require('./tasks');
const statuses = require('./statuses');

module.exports = function (app, sequelize) {
    app.use(express.json());
    app.use(
        express.urlencoded({
            extended: true,
        })
    );
    
    app.use('/', auth(sequelize));
    app.use('/api/tasks', tasks(sequelize));
    app.use('/api/statuses', statuses(sequelize));

    // Expose public folder
    app.use(express.static('public'))

    app.use(error)
}