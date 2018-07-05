'use strict';
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const Op = sequelize.Op;
  var Customer = sequelize.define('Customer', {
    first_name: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:"first name must be filled!"
        }
      }
    },
    last_name: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:"last name must be filled!"
        }
      }
    },
    email: {
      type:DataTypes.STRING,
      validate:{
        isEmail:{
          args:true,
          msg:'email must be in standard email format!'
        }
      },
      unique:function(value,next){
        Customer.findOne({
          where:{
            email:value,
            id:{[Op.ne]: this.id}
          }
        })
        .then(function(user){
          if(user !== null){
            return  next('email is already used!')
          }else{
            next()
          }
        })
        .catch(function(err){
          return next(err)
        })
      }
    },
    phone_number:{
      type: DataTypes.STRING,
      validate:{
        isAlphanumeric:{
          args: true,
          msg: 'only number is allowed for phone number'
        },
        not:{
          args: ["[a-z]",'i'],
          msg: 'letter is not allowed for phone number'
        },
        len:{
          args: [10,13],
          msg: 'phone number must be 10 to 13 numbers'
        }
      }
    },
    username: {
      type: DataTypes.STRING,
      validate:{
        notEmpty: {
          args: true,
          msg: 'username must be filled!'
        },
        isAlphanumeric:{
          args: true,
          msg: 'username must be alphanumeric!'
        },
        len: {
          args: [6,15],
          msg: 'username length must be 6-15 characters!'
        },
        unique:function(value,next){
        Customer.findOne({
          where:{
            username:value,
            id:{[Op.ne]: this.id}
          }
        })
        .then(function(user){
          if(user !== null){
            return  next('username is already used!')
          }else{
            next()
          }
        })
        .catch(function(err){
          return next(err)
        })
      }
    }
  },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'password must be filled!'
        },
        len: {
          args: [6,15],
          msg: 'password length must be 6-15 characters!'
        }
      }
    },
    salt: DataTypes.STRING
  }, {});
  Customer.associate = function(models) {
    // associations can be defined here
    Customer.belongsToMany(models.Item,{through:'Bill'})
    Customer.hasMany(models.Bill)
  };
  
  Customer.beforeCreate(function(customer,options){
    customer.salt = bcrypt.genSaltSync(8)
    customer.password = bcrypt.hashSync(customer.password, customer.salt)
  })

  // Customer.beforeValidate(function(customer){
  //   if(customer.username === Customer.username){

  //   }

  //   // customer.username = 
  // })

  Customer.beforeUpdate(function(customer){
    customer.salt = bcrypt.genSaltSync(8)
    customer.password = bcrypt.hashSync(customer.password, customer.salt)
  })

  // Customer.prototype.validPassword = function(password){
  //   return bcrypt.compareSync(password.this.local.password)
  // }

  return Customer;
};