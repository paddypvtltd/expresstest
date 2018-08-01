	
	var express=require('express');
var mysql = require('mysql');
var bodyParser = require("body-parser");
var pool=require('../connect/database');
class product 
{
 allproduct(req,res)
{
	
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
				//console.log('datafound: ' + data);
				return res.json(data);
			} else if (rows.length === 0) {
				//Error code 2 = no rows in db.
				data["error"] = 2;
				data["products"] = 'No products Found..';
				console.log('no data found: ' + data);
				return data;
			} else {
				data["products"] = 'error while performing query';
				return data;
				console.log('Error while performing Query: ' + err);
				//log.error('Error while performing Query: ' + err);
			}
		});
	  }
	  else
	  {
		 
		  data["error"] = 3;
		  data["products"] = 'error while connecting the database';
				return data;
				console.log('Error while performing Query: ' + err);
				//log.error('Error while performing Query: ' + err);
	  }
	});
}
}

module.exports = new product();