require('dotenv').config();

const express = require('express');
const path = require('path');
const routesProducts = require('./routes/routesProduct.cjs');
const routesAccount = require('./routes/routesAccount.cjs');
const routesCart = require('./routes/routesCart.cjs');
const app = express();
var bodyParser = require('body-parser')
var methodOverride = require('method-override')
// override with the X-HTTP-Method-Override header in the request
app.use(methodOverride('_method'))
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded())
// parse application/json
app.use(bodyParser.json())
app.use('/public',express.static(path.join(__dirname,'/public')));
app.use(express.json());
app.use('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next()
  });
app.use('/api/product' , routesProducts);
app.use('/api/account',routesAccount)
app.use('/api/cart',routesCart)

const PORT = process.env.PORT || 4000;
app.listen(PORT , () => {
    console.log(`listening on port ${PORT}`);
})


