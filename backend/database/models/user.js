'use strict';
const {
  Model
} = require('sequelize');
const jwt = require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasMany(models.Task)
    }
    /**
     * Generate token for current user using id
     * @returns string
     */
    generateAuthToken() {
      try {
        const token = jwt.sign({ id: this.id }, process.env.SECRET);
        return token;
      } catch (error) {
        console.log('Error generating JWT: ', error);
      }
    }
  }
  User.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notEmpty: true
      }
    },
    password: {
      type: DataTypes.STRING(64),
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};