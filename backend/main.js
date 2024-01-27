require('express-async-errors');
const express = require("express");
const app = express();
require('dotenv').config();
const socketIo = require('socket.io');

const sequelize = require('./database/db');

require('./routes/routes')(app, sequelize);

port = process.env.APP_PORT;
const server = app.listen(port, () => {
    console.log(`Todo backend listening at http://localhost:${port}`);
});

const io = socketIo(server);
require('./sockets/connections')(io, sequelize);

module.exports = server;