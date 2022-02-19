'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class toppingOrder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      toppingOrder.belongsTo(models.topping,{
        as: "topping",
        foreignKey: {
          name: "toppingId"
        }
      })

      toppingOrder.belongsTo(models.productOrder,{
        as:"ProductOrder",
        foreignKey:{
          name: "idProductOrder"
        }
      })

    }
  }
  toppingOrder.init({
    idProductOrder: DataTypes.INTEGER,
    toppingId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'toppingOrder',
  });
  return toppingOrder;
};