'use strict';
module.exports = (sequelize, DataTypes) => {
  var Bill = sequelize.define('Bill', {
    CustomerId: DataTypes.INTEGER,
    ItemId: DataTypes.INTEGER
  }, {});
  Bill.associate = function(models) {
    // associations can be defined here
    Bill.belongsTo(models.Customer)
    Bill.belongsTo(models.Item)
  };
  return Bill;
};