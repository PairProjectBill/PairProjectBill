'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const app = express()

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: false}));
app.use('/', routes);

app.listen(4000, function(){
    console.log('listening to port: 4000');    
});


