const express = require('express');
const auth = require('./auth');

module.exports = function (app, sequelize) {
    app.use(express.json());
    app.use(
        express.urlencoded({
            extended: true,
        })
    );
    
    app.use('/', auth(sequelize));

    // Expose public folder
    app.use(express.static('public'))
}