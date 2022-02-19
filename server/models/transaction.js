'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      transaction.hasMany(models.productOrder,{
        as: "productOrder",
        foreignKey:{
          name: "idTransaction"
        }
      })

      transaction.belongsTo(models.user,{
        as: "user",
        foreignKey:{
          name: "idCustomer"
        }
      });

    }
  }
  transaction.init({
    idCustomer: DataTypes.INTEGER,
    transactionStatus: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'transaction',
  });
  return transaction;
};