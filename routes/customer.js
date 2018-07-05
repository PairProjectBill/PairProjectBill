const routes = require('express').Router();
const models = require('../models');
const bcrypt = require('bcrypt')

routes.get('/', function(req, res){
    res.send('customer page')
});

routes.get('/register', function(req, res){
    res.render('./customers/customer-register.ejs')
});

routes.post('/register',function(req, res){
    models.Customer.create({
        first_name:req.body.firstName,
        last_name:req.body.lastName,
        email:req.body.email,
        phone_number:req.body.phoneNumber,
        username:req.body.username,
        password:req.body.password
    })
    .then(function(){
        res.redirect('/') 
    })
});

routes.post('/login', function(req, res){
    models.Customer.findAll({
        where:{
            username: req.body.username
        }
    })      
    .then(function(customer){
        if (bcrypt.hashSync(req.body.password, customer[0].salt) === customer[0].password) {
            res.redirect(`/customer/${customer[0].id}`);
          }else {
            res.redirect('/')
          }
    })
});

routes.get('/:id',function(req,res){
    models.Customer
    .findById(req.params.id)
    .then(function(customer){
        // res.send(customer)
        res.render('./customers/customer.ejs',{dataCustomer: customer})
    })
})

routes.get('/:id/edit',function(req,res){
    models.Customer
    .findById(req.params.id)
    .then(function(customer){
        // res.send(customer)
        res.render('./customers/customer-edit-account.ejs',{dataCustomer:customer})
    })
})

routes.post('/:id/update',function(req,res){
    // res.send(req.body)
    models.Customer.update({
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        email: req.body.email,
        phone_number: req.body.phoneNumber,
        username: req.body.username,
        password: req.body.password
    },{
        where: {id: req.params.id}
    })
    .then(function(customer){
        // res.send(customer)
        res.redirect(`/customer/${customer[0].id}`)
    })
})

routes.post('/:id/add-item')




module.exports = routes;