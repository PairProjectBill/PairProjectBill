const routes = require('express').Router();
const models = require('../models');

routes.get('/:id/add',function(req,res){
    models.Customer
    .findById(req.params.id,{
        include:{
            model:models.Item
        }
    })
    .then(function(customer){
        // res.send(customer)
        res.render('./items/item-add.ejs')
    })
})

routes.post('/:id/add',function(req,res){
    models.Customer.Items.create({
        item_name:req.body.itemName,
        item_price:req.body.itemPrice,
        tenor:req.body.tenor,
        due_date:req.body.dueDate,
        bill_price: this.item_price/this.tenor,
        remaining_debt:this.item_price
    })
    .then(function(){
        res.redirect('/customer')
    })
    // res.render('./items/item-add.ejs')
})

module.exports = routes