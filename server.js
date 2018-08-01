 var express =require('express');
 var path =require('path');
 var bodyParser =require('body-parser');
 var approute=require('./routes/approute');
 var webdemo=require('./routes/webroute');
var port=3000;
 var app=express();
//body parse 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use('/',approute);
app.use('/webservice',webdemo);
app.listen(port,function(){
	console.log('server Staredon port'+port);
});