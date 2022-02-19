'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class productOrder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      productOrder.hasMany(models.toppingOrder,{
        as:"toppingOrder",
        foreignKey:{
          name: "idProductOrder"
        }
      })

      productOrder.belongsTo(models.product,{
        as:"product",
        foreignKey: {
          name: "idProduct"
        }
      })

    }
  }
  productOrder.init({
    idTransaction: DataTypes.INTEGER,
    idProduct: DataTypes.INTEGER,
    qty: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'productOrder',
  });
  return productOrder;
};