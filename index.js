require('dotenv').config();

const express = require('express');
const path = require('path');
const routeProducts = require('./routes/routeProduct');
const routeCart = require('./routes/routeCart');
const routeUser = require('./routes/routeUser');
const app = express();
var bodyParser = require('body-parser')
var methodOverride = require('method-override');
const { resolveSoa } = require('dns');
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept, Authorization, X-Request-With');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  // Pass to next layer of middleware
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  next();
});
// override with the X-HTTP-Method-Override header in the request
app.use(methodOverride('_method'))
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())
// parse application/json

app.use('/public',express.static(path.join(__dirname,'/public')));
app.use(express.json());
  app.use('/api/product' , routeProducts);
  app.use('/api/cart',routeCart)
  app.use('/api/user',routeUser)
const PORT = process.env.PORT || 4000;
app.listen(PORT , () => {
    console.log(`listening on port ${PORT}`);
})


