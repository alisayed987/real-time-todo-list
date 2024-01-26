'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Status extends Model {
    static associate(models) {
      this.hasMany(models.Task)
    }
  }
  Status.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      allowNull: false,
      unique: true,
      type: DataTypes.String
    }
  }, {
    sequelize,
    modelName: 'Status',
  });
  return Status;
};