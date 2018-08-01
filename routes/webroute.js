var express=require('express');
var router =express.Router();
var control = require('../controller/webservice.js');
// This responds a GET request for the /list page.
router.get('/list', function (req,res) {
	console.log("GET Request :: /weblist");
//	log.info('GET Request :: /list');
control.list(function(err,result){ 
 if(err) { res.send(500,"Server Error"); return;} 
res.json(result);
});
});

module.exports = router;