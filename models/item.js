'use strict';
module.exports = (sequelize, DataTypes) => {
  var Item = sequelize.define('Item', {
    item_name: DataTypes.STRING,
    item_price: DataTypes.INTEGER,
    tenor: DataTypes.INTEGER,
    due_date: DataTypes.INTEGER,
    bill_price: DataTypes.INTEGER,
    remaining_debt: DataTypes.INTEGER
  }, {});
  Item.associate = function(models) {
    // associations can be defined here
    Item.belongsToMany(models.Customer,{through:'Bill'})
    Item.hasMany(models.Bill)
  };
  return Item;
};