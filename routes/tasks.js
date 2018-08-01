var express=require('express');
var router =express.Router();
var app = express();
var mysql = require('mysql');
var bodyParser = require("body-parser");
 var pool=require('../connect/database');

// This responds a GET request for the /list page.
router.get('/list', function (req, res) {
	console.log("GET Request :: /list");
//	log.info('GET Request :: /list');
	var data = {
        "error": 1,
        "products": ""
    };
	
	pool.getConnection(function (err, connection) {
		if (!err) 
		{
		connection.query('SELECT * from products', function (err, rows, fields) {
			connection.release();

			if (rows.length !== 0 && !err) {
				data["error"] = 0;
				data["products"] = rows;
				res.json(data);
			} else if (rows.length === 0) {
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
	  else
	  {
		  data["error"] = 3;
		  data["products"] = 'error while connecting the database';
				res.json(data);
				console.log('Error while performing Query: ' + err);
				//log.error('Error while performing Query: ' + err);
	  }
	});
});

module.exports = router;