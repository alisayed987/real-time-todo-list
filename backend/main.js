const express = require("express");
const app = express();
require('dotenv').config();

require('./routes/routes')(app);

port = process.env.APP_PORT;
const server = app.listen(port, () => {
    console.log(`Todo backend listening at http://localhost:${port}`);
});

module.exports = server;