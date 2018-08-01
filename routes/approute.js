var express=require('express');
var router =express.Router();


//const formidable = require('express-formidable');

//app.use(formidable());
var userDetails = require('../controller/user_registration.js');

// Registraion and login start 
router.post('/ws-user-registered',function(req,res) {
	console.log("POST Request :: /ws-user-registered");
	userDetails.userRegistration(req,function(err,result){ 
 if(err) { res.send(500,"Server Error"); return;} 
res.json(result);
});
	});
router.post('/ws-user-registered-step-two',function(req,res) {
	console.log("POST Request :: /ws-user-registered-step-two");
	userDetails.userRegistrationStep2(req,function(err,result){ 
 if(err) { res.send(500,"Server Error"); return;} 
res.json(result);
});
});
router.post('/ws-login',function(req,res) {
	console.log("POST Request :: /ws-login");
	userDetails.userLogin(req,function(err,result){ 
 if(err) { res.send(500,"Server Error"); return;} 
res.json(result);
});
});
router.post('/ws-login-step-two',function(req,res) {
	console.log("POST Request :: /ws-login-step-two");
	userDetails.userLoginstep2(req,function(err,result){ 
 if(err) { res.send(500,"Server Error"); return;} 
res.json(result);
});
});
// Registraion and login end 

var storeDetails=require('../controller/store_details.js');
//store Details start
router.post('/ws-get-city-list',function(req,res) {
	console.log("POST Request :: /ws-get-city-list");
	storeDetails.getCityDetails(req,function(err,result){ 
 if(err) { res.send(500,"Server Error"); return;} 
res.json(result);
});
});
router.post('/ws-get-location-list',function(req,res) {
	console.log("POST Request :: /ws-get-city-list");
	storeDetails.getLocationDetails(req,function(err,result){ 
 if(err) { res.send(500,"Server Error"); return;} 
res.json(result);
});
});


router.post('/ws-get-store-list',function(req,res) {
	console.log("POST Request :: /ws-get-store-list");
	storeDetails.getStoreDetails(req,function(err,result){ 
 if(err) { res.send(500,"Server Error"); return;} 
res.json(result);
});
});

router.post('/ws-get-category-list',function(req,res) {
	console.log("POST Request :: /ws-get-category-list");
	storeDetails.getCategoryList(req,function(err,result){ 
 if(err) { res.send(500,"Server Error"); return;} 
res.json(result);
});
});
//store Details End


module.exports = router;