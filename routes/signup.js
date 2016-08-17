/**
 * New node file
 */
var ejs= require('ejs');
var mysql = require('mysql');

function getConnection(){
	var connection = mysql.createConnection({
	    host     : 'localhost',
	    user     : 'root',
	    password : '',
	    database : 'sachi',
	    port	 : 3306
	});
	return connection;
}

exports.signup = function(req, res){
	
	var connection=getConnection();
	
	var firstName = req.param("firstName");
	var lastName = req.param("lastName");
	var email = req.param("email");
	var password = req.param("password");
	
	console.log("inside signup");
	console.log(firstName);
	
	var sqlQuery = "insert into users(fname,lname,email,password) values ('"+firstName+"','"+lastName+"','"+email+"','"+password+"');";
	
//	sqlQuery = "insert into users(fname,lname,email,password) values (apoorv,patel,apoorv,123456);";
	
	console.log("\nSQL Query::"+sqlQuery);
	
	connection.query(sqlQuery, function(err, rows, fields) {
		if(err){
			console.log("ERROR: " + err.message);
		}
		else 
		{	// return err or result
			console.log("DB Results:"+rows);
			var json_responses = {"success" : 1};
			connection.end();
			res.send(json_responses);
//			callback(err, rows);
		}
	});
	console.log("\nConnection closed..");
	
};

exports.signin = function(req, res){
	
	var connection=getConnection();
	
	var email = req.param("email");
	var password = req.param("password");
	
	console.log("inside signin");
	
	var sqlQuery = "select password from users where email ='"+email+"'";
	
//	sqlQuery = "insert into users(fname,lname,email,password) values (apoorv,patel,apoorv,123456);";
	
	console.log("\nSQL Query::"+sqlQuery);
	
	connection.query(sqlQuery,function(err,rows){
		if(err)
		{
			console.log("ERROR: " + err.message);
		}
		else
		{
			console.log('Data received from Db:\n');
			console.log(rows);
			
			if (rows.length == 0)
			{
				console.log("Invalid username");
				var json_responses = {"success" : -1};
				res.send(json_responses);
			}
			else
			{
//				for (var i = 0; i < rows.length; i++) {
//					  console.log(rows[i].password);
//					};
				
				var correctPassword = rows[0].password;
				
				if (correctPassword === password)
				{
					console.log("successful login");
					req.session.username = email;
					var json_responses = {"success" : 1};
					res.send(json_responses);
				}
				else
				{
					console.log("wrong password");
					var json_responses = {"success" : 0};
					res.send(json_responses);
				}
			}	
		}
	});
	console.log("\nConnection closed..");
	connection.end();
}; 

exports.signout = function(req, res){
	req.session.destroy();
	res.redirect('/');
//	var json_responses = {"success" : 1};
//	res.send(json_responses);
};
