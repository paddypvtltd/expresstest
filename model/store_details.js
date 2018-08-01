var express=require('express');
var mysql = require('mysql');
var bodyParser = require("body-parser");
var pool=require('../connect/database');
exports.getCityDetails=function(callback)
{
	pool.getConnection(function (err, connection) {
		if (!err) 
		{
			
		connection.query('SELECT city_id,city_name,city_image,city_status from p979_mst_city ',function (err, rows, fields) {
		//	 console.log('this.sql', this.sql);
			connection.release();
			if(err) { console.log(err); callback(true); return; }
      callback(false, rows);
		}); 
	  }
	  else
	  {
	  	 callback(true, 'database connection erro');
	  }
  });
}
exports.getLocationDetails=function(dataarr,callback)
{
	
	pool.getConnection(function (err, connection) {
		if (!err) 
		{
			
		connection.query('SELECT location_id,location_name,location_address,location_image,location_status from p979_mst_location where city_id_fk=? ',[dataarr['city_id']], function (err, rows, fields) {
		//	 console.log('this.sql', this.sql);
			connection.release();
			if(err) { console.log(err); callback(true); return; }
      callback(false, rows);
		}); 
	  }
  });
}
exports.getStoreDetails=function(dataarr,callback)
{
	
	pool.getConnection(function (err, connection) {
		if (!err) 
		{
			
		connection.query('SELECT store_id,store_name,store_email,store_mobile,store_address,store_image,store_panno_url,store_status,store_bg_image from p979_mst_store_details where location_id_fk=? ',[dataarr['location_id']], function (err, rows, fields) {
		//	 console.log('this.sql', this.sql);
			connection.release();
			if(err) { console.log(err); callback(true); return; }
			
   callback(false, rows);
		}); 
	  }
  });
}
exports.getCategoryDetailsByParentId=function(dataarr,callback)
{
	//var datareturn={};
	pool.getConnection(function (err, connection) {
		if (!err) 
		{	
		connection.query('SELECT category_id,category_name,parent_id,category_image FROM p979_mst_category WHERE  tradition_status = "1" and category_status="1" and parent_id = ? ORDER BY category_id ASC ',[dataarr['category_id']], function (err, rows, fields) {
			// console.log('this.sql', this.sql);
			connection.release();
			if(err) { console.log(err); callback(true); return; }
      
      callback(false, rows);
		}); 
	  }
  });
	
}
exports.gettestweb=function(dataarr)
{
	pool.getConnection(function (err, connection) {
		if (!err) 
		{	
		connection.query('SELECT category_id,category_name,parent_id,category_image FROM p979_mst_category WHERE  tradition_status = "1" and category_status="1" and parent_id = ? ORDER BY category_id ASC ',[dataarr['category_id']], function (err, rows, fields) {
			 console.log('this.sql', this.sql);
			connection.release();
			if(err) { console.log(err); callback(true); return; }
      datareturn = rows;
      //callback(false, rows);
		}); 
	  }
  });

}