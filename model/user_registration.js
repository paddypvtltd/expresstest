var express=require('express');
var mysql = require('mysql');
var bodyParser = require("body-parser");
var pool=require('../connect/database');
exports.checkExit=function(dataarr,callback)
{
	
	pool.getConnection(function (err, connection) {
		if (!err) 
		{
			
		connection.query('SELECT count(*) as userexit from p979_mst_users where mobile_no=? ',[dataarr['mobile_no']], function (err, rows, fields) {
		//	 console.log('this.sql', this.sql);
			connection.release();
			if(err) { console.log(err); callback(true); return; }
      callback(false, rows);
		}); 
	  }
  });
}
exports.userinsert=function(dataarr,callback)
{	
	pool.getConnection(function (err, connection) {
		if (!err) 
		{	

		connection.query("INSERT INTO p979_mst_users SET user_name = ?, user_email = ?, mobile_no = ?,user_type='1',mobile_verification_code=?,register_date=?",[dataarr['user_name'],dataarr['user_email'],dataarr['mobile_no'],dataarr['code'],dataarr['currentdate']], function (err, rows, fields) {
			 //console.log('this.sql', this.sql);
			connection.release();
			if(err) { console.log(err); callback(true); return; }
      callback(false, rows);
		}); 
	  }
  });
}
exports.userDetails=function(dataarr,callback)
{
	
	pool.getConnection(function (err, connection) {
		if (!err) 
		{
			
		connection.query('SELECT * from p979_mst_users where mobile_no=? ',[dataarr['mobile_no']], function (err, rows, fields) {
			 //console.log('this.sql', this.sql);
			connection.release();
			if(err) { console.log(err); callback(true); return; }
      callback(false, rows);
		}); 
	  }
  });
}
//module.exports = new product();