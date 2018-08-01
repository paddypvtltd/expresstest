var express=require('express');
var userDetails=require('../model/user_registration.js');
 var app=express();
 var bodyParser = require("body-parser");
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
var Nexmo = require('nexmo');
var nexmo = new Nexmo({
    apiKey: '06572e84',
    apiSecret: '957aac50',
  });
// This responds a GET request for the /list page.
exports.userRegistration = function(req,callback){
    // console.log(req.body.user_name);
	var arrdata=[];
	var datacount;
	var arr_to_return=[];
	var response_arr=[];
	var requested_id='';
	arrdata['user_name']=req.body.user_name;
	arrdata['user_email']=req.body.user_email;
	arrdata['mobile_no']=req.body.user_mobile_number;
	arrdata['device_id']=req.body.device_id;
	if (typeof arrdata !== 'undefined' && arrdata['mobile_no'] != '') {
	 userDetails.checkExit(arrdata,function(err,result){
		if(err) { res.send(500,"Server Error"); return;} 
		var row = result[0];
       datacount=row.userexit;	
	  console.log(datacount);
	if(datacount > 0)
	{
		  arr_to_return = {'error_code': '1', 'msg': 'Already mobile number register'};
                response_arr = {'Response' : arr_to_return};
			  callback(false,response_arr);
	}
	else
	{
		nexmo.verify.request({number:'+91'+arrdata['mobile_no'],brand:'Shopease'},function(err, result) {
    if(err) {
      console.log(err);
 
      //Oops! Something went wrong, respond with 500: Server Error
      //res.status(500).send(err);
	  // console.log(result);
	    resultReturn = {'error_code' : '1', 'msg' :err};
                    response_arr = {'Response' : resultReturn};
                   callback(false,response_arr);
    } else {
     
 
 resultReturn = {'error_code' : '0', "status" : result.status, 'msg' :'success', 'request_id':result.request_id};
                    response_arr = {'Response' :resultReturn};
                   callback(false,response_arr);
					
      /* if(result && result.status == '0' || ) {
        //A status of 0 means success! Respond with 200: OK
		console.log(result.request_id);
        //res.status(200).send(result);
      } else {
        //A status other than 0 means that something is wrong with the request. Respond with 400: Bad Request
        //The rest of the status values can be found here: https://developer.nexmo.com/api/verify#status-values
       console.log(result.request_id);
	   // res.status(400).send(result);
      }*/
    }
	 });
	}
 });
	}
	else
	{
		
		resultReturn = {'error_code' : '1', 'msg' :'NO Data input'};
                    response_arr = {'Response' : resultReturn};
                   callback(false,response_arr);
	}
	
}
//registration otp varification 
exports.userRegistrationStep2 = function(req,callback){
    // console.log(req.body.user_name);
	var arrdata=[];
	var datacount;
	var arr_to_return=[];
	var response_arr=[];
	var requested_id='';
	arrdata['user_name']=req.body.user_name;
	arrdata['user_email']=req.body.user_email;
	arrdata['mobile_no']=req.body.user_mobile_number;
	arrdata['device_id']=req.body.device_id;
	arrdata['code']=req.body.code;
	arrdata['request_id']=req.body.request_id;
	arrdata['currentdate']= new Date();
	 nexmo.verify.check({request_id: arrdata['request_id'], code: arrdata['code']}, (err, result) => {
    if(err) {
      console.log(err);
       arr_to_return = {'error_code':'1', 'msg':err};
       response_arr = {'Response' : arr_to_return};
      //Oops! Something went wrong, respond with 500: Server Error
     callback(false,response_arr);
    } else {
      if(result && result.status == '0') {
        //A status of 0 means success! Respond with 200: OK
        //res.status(200).send(result);
 userDetails.userinsert(arrdata,function(err,result){
		if(err) { res.send(500,"Server Error"); return;} 
		fields['user_id'] =  result['insertId'];

		 arr_to_return = {'error_code':'0', 'msg':'success', 'user_info' : fields};
         response_arr = {'Response' : arr_to_return};
         callback(false,response_arr);
	});
        
      } else {
        //A status other than 0 means that something is wrong with the request. Respond with 400: Bad Request
        //The rest of the status values can be found here: https://developer.nexmo.com/api/verify#status-values
       // res.status(400).send(result);
        arr_to_return = {'error_code':'1', 'msg':'Error verifying account'};
       response_arr = {'Response' : arr_to_return};
        console.log('Error verifying account')
          callback(false,response_arr);
      }
    }
  });
	
}

exports.userLogin = function(req,callback){
    // console.log(req.body.user_name);
	var arrdata=[];
	var datacount;
	var arr_to_return=[];
	var response_arr=[];
	var requested_id='';
	arrdata['mobile_no']=req.body.user_mobile_number;
	if (typeof arrdata !== 'undefined' && arrdata['mobile_no'] != '') {
	 userDetails.checkExit(arrdata,function(err,result){
		if(err) { res.send(500,"Server Error"); return;} 
		var row = result[0];
       datacount=row.userexit;	
	  console.log(datacount);
	         if(datacount > 0)
	                {
				nexmo.verify.request({number:'+91'+arrdata['mobile_no'],brand:'Shopease'},function(err, result) {
               if(err) {
                        console.log(err);
	                       resultReturn = {'error_code' : '1', 'msg' :err};
                           response_arr = {'Response' : resultReturn};
                           callback(false,response_arr);
                } else {
     
 
                    resultReturn = {'error_code' : '0', "status" : result.status, 'msg' :'success', 'request_id':result.request_id};
                    response_arr = {'Response' :resultReturn};
                   callback(false,response_arr);
                }
	        });

	  }
	else
	{
                 resultReturn = {'error_code' : '1', 'msg' :'Please Register First'};
                    response_arr = {'Response' : resultReturn};
                   callback(false,response_arr);
	}
 });
	}
	else
	{
		
		resultReturn = {'error_code' : '1', 'msg' :'NO Data input'};
                    response_arr = {'Response' : resultReturn};
                   callback(false,response_arr);
	}
	
}

// login otp varification
exports.userLoginstep2 = function(req,callback){
    // console.log(req.body.user_name);
	var arrdata=[];
	var datacount;
	var arr_to_return=[];
	var response_arr=[];
	var requested_id='';
	
	arrdata['mobile_no']=req.body.user_mobile_number;
	arrdata['code']=req.body.code;
	arrdata['request_id']=req.body.request_id;
	if(arrdata['mobile_no']!='' && arrdata['code']!='' && arrdata['request_id'] !='' )
	{
	 nexmo.verify.check({request_id: arrdata['request_id'], code: arrdata['code']}, (err, result) => {
    if(err) {
      console.log(err);
       arr_to_return = {'error_code':'1', 'msg':err};
       response_arr = {'Response' : arr_to_return};
      //Oops! Something went wrong, respond with 500: Server Error
     callback(false,response_arr);
    } else {
      if(result && result.status == '0') {
        //A status of 0 means success! Respond with 200: OK
        //res.status(200).send(result);
userDetails.userDetails(arrdata,function(err,result){
		if(err) { res.send(500,"Server Error"); return;} 
	if(result.length > 0)
	{
		  arr_to_return = {'error_code': '0', 'msg': 'success','user_info' :results[0]};
                response_arr = {'Response' : arr_to_return};
			  callback(false,response_arr);
	}
	else
	{
		arr_to_return = {'error_code':'1', 'msg':'Invalid Mobile Number'};
         response_arr = {'Response' : arr_to_return};
         callback(false,response_arr);
	}

		 
	});
        
      } else {
        //A status other than 0 means that something is wrong with the request. Respond with 400: Bad Request
        //The rest of the status values can be found here: https://developer.nexmo.com/api/verify#status-values
       // res.status(400).send(result);
        arr_to_return = {'error_code':'1', 'msg':'Error verifying account'};
       response_arr = {'Response' : arr_to_return};
        console.log('Error verifying account')
          callback(false,response_arr);
      }
    }
  });
	}
	else
	{
		 arr_to_return = {'error_code':'1', 'msg':"No Input Data"};
       response_arr = {'Response' : arr_to_return};
      //Oops! Something went wrong, respond with 500: Server Error
     callback(false,response_arr);
	}
}
//module.exports = router;