var express=require('express');
var router =express.Router();
var model=require('../model/webservice.js');
// This responds a GET request for the /list page.
exports.getAll = function(){
	console.log("GET Request :: /list");
//	log.info('GET Request :: /list');
	var data = {
        "error": 1,
        "products": ""
    };
	  model.getAll(function(err,result){
		  if(err) { res.send(500,"Server Error"); return;} 
		 /*Object.keys(result).forEach(function(key) {
      var row = result[key];
      console.log(row.name)
    });*/
	if (result.length !== 0 && !err) {
				data["error"] = 0;
				data["products"] = result;
				//console.log('datafound:'+ res.json(data));
				res.json(data);
			} else if (result.length === 0) {
				//Error code 2 = no rows in db.
				data["error"] = 2;
				data["products"] = 'No products Found..';
				res.json(data);
			} else {
				data["products"] = 'error while performing query';
				res.json(data);
				console.log('Error while performing Query: ' + err);
				//log.error('Error while performing Query: ' + err);
			}
			
	 });
}

//module.exports = router;