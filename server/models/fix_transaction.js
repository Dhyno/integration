'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class fix_transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      fix_transaction.belongsTo(models.transaction,{
        as: "transaction",
        foreignKey:{
          name: "idTransaction"
        }
      })
    }
  }
  fix_transaction.init({
    idTransaction: DataTypes.INTEGER,
    status: DataTypes.STRING,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    postCode: DataTypes.INTEGER,
    addres: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'fix_transaction',
  });
  return fix_transaction;
};