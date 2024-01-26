const { Sequelize } = require('sequelize');
const config = require('../config.js')

//-----------< Create DB connection >------------------------------
const sequelize = new Sequelize(config.db.database, config.db.user, config.db.password, {
  host: config.db.host,
  port: config.db.port,
  dialect: 'mysql'
});

/**
 * Register all associations using the models in the "/models" directory
 */
let modelsArr = [];
fs
  .readdirSync(__dirname + "\\models")
  .forEach(file => {
    const model = require(`./models/${file}`)(sequelize, Sequelize.DataTypes);
    modelsArr[model.name] = model;
  });

Object.keys(modelsArr).forEach(modelName => {
  if (modelsArr[modelName].associate) {
    modelsArr[modelName].associate(modelsArr);
  }
});

sequelize.authenticate()
  .then(() => console.log('Connection has been established'))
  .catch((error) => console.error('Unable to connect to the database:', error))

module.exports = sequelize;