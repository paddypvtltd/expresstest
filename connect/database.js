var mysql = require('mysql');
/*MY SQL Connection Info*/
var pool = mysql.createPool({
	host     : 'localhost',
	user     : 'root',
	password : '',
	database : 'shopease_test',
	prefix   :  'p979',
});

pool.getConnection(function (err, connection) {
	if (!err) {
		console.log("Database is connected ... ");
		//log.info('Database is connected ... ');
		connection.release();
	} else {
		console.log("Error connecting database ... ");
		//log.error('Error connecting database ... ');
	}
	console.log("releasing connection ... ");
});
module.exports = pool;