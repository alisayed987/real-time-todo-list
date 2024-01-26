'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    static associate(models) {
      this.belongsTo(models.User)
      this.belongsTo(models.Status)
    }
  }
  Task.init({
    id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
        key: "id"
      }
    },
    statusId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Statuses",
        key: "id"
      }
    },
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};