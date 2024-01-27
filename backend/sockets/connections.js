const socketAuth = require('../middlewares/socketMiddlewares/socketAuth')

module.exports = (io, sequelize) => {
  io.use(socketAuth);

  require("./taskSocket")(io, sequelize);
};
