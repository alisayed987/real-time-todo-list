const socketAccessLogger = require('../middlewares/socketMiddlewares/socketAccessLogger');
const socketAuth = require('../middlewares/socketMiddlewares/socketAuth')

module.exports = (io, sequelize) => {
  io.use(socketAccessLogger);
  io.use(socketAuth);

  require("./taskSocket")(io, sequelize);
};
