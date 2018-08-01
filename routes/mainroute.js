 var express =require('express');
  var path =require('path');
  var bodyParser = require("body-parser");
   var app=express();
   
 var tasks=require('../controller/tasks');
 //var webservice=require('../controller/webservice');
   app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use('/api',tasks);
//app.use('/',webservice);
module.exports = app;