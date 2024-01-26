const express = require('express');

module.exports = function (app, sequelize) {
    app.use(express.json());
    app.use(
        express.urlencoded({
            extended: true,
        })
    );
    
    // Expose public folder
    app.use(express.static('public'))
}