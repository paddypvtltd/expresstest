var express=require('express');
var model=require('../model/webservice.js');
// This responds a GET request for the /list page.
exports.list = function(callback){
	console.log("connect controller");
var data = {
        "error": 1,
        "products": ""
    };
	  model.getAll(function(err,result){
		
	if(err) { res.send(500,"Server Error"); return;} 
		 
	if (result.length !== 0 && !err) {
				data["error"] = 0;
				data["products"] = result;
				//console.log('datafound:'+ res.json(data));
				callback(false,data);
			} else if (result.length === 0) {
				//Error code 2 = no rows in db.
				data["error"] = 2;
				data["products"] = 'No products Found..';
				callback(false,data);
			} else {
				data["products"] = 'error while performing query';
				callback(false,data);
				console.log('Error while performing Query: ' + err);
				//log.error('Error while performing Query: ' + err);
			}
			
	 });
}

//module.exports = router;