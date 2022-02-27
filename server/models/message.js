'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  message.init({
    idAdmin: DataTypes.INTEGER,
    idUser: DataTypes.INTEGER,
    textMessage: DataTypes.TEXT,
    typeMessage: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'message',
  });
  return message;
};