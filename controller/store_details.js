var express=require('express');
var storeDetails=require('../model/store_details.js');
 var app=express();
 var bodyParser = require("body-parser");
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

exports.getCityDetails = function(req,callback){
    // console.log(req.body.user_name);
	var arrdata=[];
	var datacount;
	var arr_to_return=[];
	var response_arr=[];
	var requested_id='';
	var user_id = req.body.user_id ;
	  storeDetails.getCityDetails(function(err,result){
		if(err) { res.send(500,"Server Error"); return;} 
		
		if(result.length > 0)
		{
			 arr_to_return = {'error_code':'0', 'msg':'success', 'city_details' : result,'total_count_is_gift':'0','total_count':'0','img_path':'media/backend/storeimg/'};
         response_arr = {'Response' : arr_to_return};
         callback(false,response_arr);
		}
		else
		{
			 arr_to_return = {'error_code':'1', 'msg':'fail', 'city_details' : '' ,'total_count_is_gift':'0','total_count':'0','img_path':'media/backend/storeimg/'};
          response_arr = {'Response' : arr_to_return};
        console.log('Error verifying account')
          callback(false,response_arr);
		}
	});
	
}
exports.getLocationDetails = function(req,callback){
    // console.log(req.body.user_name);
	var arrdata=[];
	var datacount;
	var arr_to_return=[];
	var response_arr=[];
	var requested_id='';
	arrdata['city_id'] = req.body.city_id ;
	if(arrdata['city_id']  !='')
	{

	  storeDetails.getLocationDetails(arrdata,function(err,result){
		if(err) { res.send(500,"Server Error"); return;} 
		
		if(result.length > 0)
		{
	     arr_to_return = {'error_code':'0', 'msg':'success', 'location_details' : result,'img_path':'media/backend/storeimg/'};
         response_arr = {'Response' : arr_to_return};
         callback(false,response_arr);
		}
		else
		{
		  arr_to_return = {'error_code':'1', 'msg':'No Record Found', 'location_details' : '' ,'img_path':'media/backend/storeimg/'};
          response_arr = {'Response' : arr_to_return};
        console.log('No Record Found')
          callback(false,response_arr);
		}
	});
	}
	else
	{
        arr_to_return = {'error_code':'1', 'msg':'No Input Data', 'location_details' : '' ,'img_path':'media/backend/storeimg/'};
        response_arr = {'Response' : arr_to_return};
        console.log('No Input Data');
        callback(false,response_arr);
	}
	
}
exports.getStoreDetails = function(req,callback){
    // console.log(req.body.user_name);
	var arrdata=[];
	var datacount;
	var arr_to_return=[];
	var response_arr=[];
	var requested_id='';
	arrdata['location_id'] = req.body.location_id ;
	if(arrdata['location_id'] !='')
	{

	  storeDetails.getStoreDetails(arrdata,function(err,result){
		if(err) { res.send(500,"Server Error"); return;} 
		
		if(result.length > 0)
		{
	     arr_to_return = {'error_code':'0', 'msg':'success', 'store_details' : result,'img_path':'media/backend/storeimg/'};
         response_arr = {'Response' : arr_to_return};
         callback(false,response_arr);
		}
		else
		{
		  arr_to_return = {'error_code':'1', 'msg':'No Record Found', 'store_details' : '' ,'img_path':'media/backend/storeimg/'};
          response_arr = {'Response' : arr_to_return};
        console.log('No Record Found')
          callback(false,response_arr);
		}
	});
	}	
	else
	{
        arr_to_return = {'error_code':'1', 'msg':'No Input Data', 'store_details' : '' ,'img_path':'media/backend/storeimg/'};
        response_arr = {'Response' : arr_to_return};
        console.log('No Input Data');
        callback(false,response_arr);
	}
	
}
exports.getCategoryList = function(req,callback){
    // console.log(req.body.user_name);
	var arrdata=[];
	var datacount;
	var arr_to_return=[];
	var response_arr=[];
	var requested_id='';
	var cattree={};
	var catdata={};
	arrdata['category_id'] = req.body.category_id ;
	if(arrdata['category_id'] !='')
	{

	  storeDetails.getCategoryDetailsByParentId(arrdata,function(err,result){
		if(err) { res.send(500,"Server Error"); return;} 
		
		Object.keys(result).forEach(function(key) {
      cattree[key] = result[key];
      catdata['category_id']= result[key]['category_id'];
      catdata['key']=key;
      storeDetails.getCategoryDetailsByParentId(catdata,function(err,cresult){
if(err) { res.send(500,"Server Error"); return;} 
cattree[key]['subcategories'] = cresult;
console.log(catdata);
       }); 
       // console.log(catdata);
    });
		
		if(result.length > 0)
		{
	     arr_to_return = {'error_code':'0', 'msg':'success', 'category_list' : cattree,'img_path':'media/backend/storeimg/'};
         response_arr = {'Response' : arr_to_return};
         //callback(false,response_arr);
		}
		else
		{
		  arr_to_return = {'error_code':'1', 'msg':'No Record Found', 'category_list' : '' ,'img_path':'media/backend/storeimg/'};
          response_arr = {'Response' : arr_to_return};
        console.log('No Record Found')
         // callback(false,response_arr);
		}
	});
	}	
	else
	{
        arr_to_return = {'error_code':'1', 'msg':'No Input Data', 'category_list' : '' ,'img_path':'media/backend/storeimg/'};
        response_arr = {'Response' : arr_to_return};
        console.log('No Input Data');
        callback(false,response_arr);
	}
	
}