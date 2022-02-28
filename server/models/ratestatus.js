'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ratestatus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ratestatus.belongsTo(models.fix_transaction,{
        as: "fix_transaction",
        foreignKey:{
          name: "idfix_transaction"
        }
      })

      ratestatus.belongsTo(models.user,{
        as: "customer",
        foreignKey:{
          name: "idCustomer"
        }
      });
    }
  }
  ratestatus.init({
    idfix_transaction: DataTypes.INTEGER,
    idCustomer: DataTypes.INTEGER,
    Commentuser: DataTypes.TEXT,
    employeeComment: DataTypes.TEXT,
    rating: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ratestatus',
  });
  return ratestatus;
};