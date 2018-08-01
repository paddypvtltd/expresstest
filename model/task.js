var express=require('express');
var mysql = require('mysql');
var bodyParser = require("body-parser");
var pool=require('../connect/database');
exports.getAll = function(callback) {
  pool.getConnection(function (err, connection) {
		if (!err) 
		{
		connection.query('SELECT * from p979_mst_product', function (err, rows, fields) {
			connection.release();
			if(err) { console.log(err); callback(true); return; }
      callback(false, rows);
		});
	  }
  });
}
//module.exports = new product();