const routes = require('express').Router();
const customer = require('./customer')
const item = require('./item')

routes.get('/', function(req,res){
    // res.send('homepage')
    res.render('./homepage/home.ejs')
})
routes.use('/customer', customer);
routes.use('/item',item)

module.exports = routes;