/**
 * New node file
 */
var mysql = require('mysql');

var name="";
var dob="";
var hometown="";
var currentCity="";

var school="";
var undergradCollege="";
var gradCollege="";

var phone="";
var email="";

var status="";

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

exports.getAbout = function(req,res)
{
	var connection=getConnection();
    var sqlQuery = "select a.name, a.hometown, a.currentcity, a.dob, b.school, b.undercollege, b.gradcollege, c.email, c.phone, d.relationship from user_overview a join work_education b on a.uid=b.uid join contactinfo c on a.uid=c.uid join lifeevent d on a.uid=d.uid where a.uid='"+req.session.username+"'"
    
    connection.query(sqlQuery,function(err,rows){
		if(err)
		{
			console.log("ERROR: " + err.message);
		}
		else
		{			
			if (rows.length != 0)
			{
				console.log("rows exist");
				console.log(rows);
				console.log(rows[0].name);
				var json_responses = {"name" : rows[0].name,
						              "hometown" : rows[0].hometown,
						              "currentcity" : rows[0].currentcity,
						              "dob" : rows[0].dob,
						              "school" : rows[0].school,
						              "undercollege" : rows[0].undercollege,
						              "gradcollege" : rows[0].gradcollege,
						              "email" : rows[0].email,
						              "phone" : rows[0].phone,
						              "relationship" : rows[0].relationship};
				connection.end();
				res.send(json_responses);
			}
		}
	});
    
    
};

exports.submitAbout = function(req,res)
{
	//Checks before redirecting whether the session is valid
	if(req.session.username)
	{
		//Set these headers to notify the browser not to maintain any cache for the page being loaded
		res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');

		name = req.param("name");
		dob = req.param("dob");
		hometown = req.param("hometown");
		currentCity = req.param("currentCity");
		insertOverview(req.session.username,res);
		
		school = req.param("school");
		undergradCollege = req.param("undergradCollege");
		gradCollege = req.param("gradCollege");
		
		email = req.param("email");
		phone = req.param("phoneNumber");
		
		status = req.param("relationshipStatus");
		
	}
	else
	{
		res.redirect('/');
	}
};

insertOverview = function(uid,res)
{
	var connection=getConnection();
	var sqlQuery = "select * from user_overview where uid ='"+uid+"'";
	
	connection.query(sqlQuery,function(err,rows){
		if(err)
		{
			console.log("ERROR: " + err.message);
			insertWorkEducation(uid,res);
		}
		else
		{			
			if (rows.length == 0)
			{
				var insertQuery = "insert into user_overview(uid,name,dob,hometown,currentcity) values ('"+uid+"','"+name+"','"+dob+"','"+hometown+"','"+currentCity+"')";
				connection.query(insertQuery, function(err, rows, fields) {
					if(err)
					{
						console.log("ERROR: " + err.message);
						insertWorkEducation(uid,res);
					}
					else 
					{	// return err or result
						insertWorkEducation(uid,res);
					}
				});
			}
			else
			{
				var insertQuery = "update user_overview set name='"+name+"',dob='"+dob+"',hometown='"+hometown+"',currentcity='"+currentCity+"' where uid ='"+uid+"'";
//				var insertQuery = "insert into user_overview(name,dob,hometown,currentcity) values ('"+name+"','"+dob+"','"+hometown+"','"+currentCity+"') where uid ='"+uid+"'";
				connection.query(insertQuery, function(err, rows, fields) {
					if(err)
					{
						console.log("ERROR: " + err.message);
						insertWorkEducation(uid,res);
					}
					else 
					{	// return err or result
						connection.end();
						insertWorkEducation(uid,res);
					}
				});
			}	
		}
	});
	
	
}

insertWorkEducation = function(uid,res)
{
	var connection=getConnection();
	var sqlQuery = "select * from work_education where uid ='"+uid+"'";
	
	connection.query(sqlQuery,function(err,rows){
		if(err)
		{
			console.log("ERROR: " + err.message);
			insertContactInfo(uid,res);
		}
		else
		{			
			if (rows.length == 0)
			{
				var insertQuery = "insert into work_education(uid,school,undercollege,gradcollege) values ('"+uid+"','"+school+"','"+undergradCollege+"','"+gradCollege+"')";
				connection.query(insertQuery, function(err, rows, fields) {
					if(err)
					{
						console.log("ERROR: " + err.message);
						insertContactInfo(uid,res);
					}
					else 
					{	// return err or result
						insertContactInfo(uid,res);
					}
				});
			}
			else
			{
				var insertQuery = "update work_education set school='"+school+"',undercollege='"+undergradCollege+"',gradcollege='"+gradCollege+"' where uid ='"+uid+"'";
				connection.query(insertQuery, function(err, rows, fields) {
					if(err)
					{
						console.log("ERROR: " + err.message);
						insertContactInfo(uid,res);
					}
					else 
					{	// return err or result
						connection.end();
						insertContactInfo(uid,res);
					}
				});
			}	
		}
	});
	
	
}

insertContactInfo = function(uid,res)
{
	var connection=getConnection();
	var sqlQuery = "select * from contactinfo where uid ='"+uid+"'";
	
	connection.query(sqlQuery,function(err,rows){
		if(err)
		{
			console.log("ERROR: " + err.message);
			insertRelationshipStatus(uid,res);
		}
		else
		{			
			if (rows.length == 0)
			{
				var insertQuery = "insert into contactinfo(uid,phone,email) values ('"+uid+"','"+phone+"','"+email+"')";
				connection.query(insertQuery, function(err, rows, fields) {
					if(err)
					{
						console.log("ERROR: " + err.message);
						insertRelationshipStatus(uid,res);
					}
					else 
					{	// return err or result
						insertRelationshipStatus(uid,res);
					}
				});
			}
			else
			{
				var insertQuery = "update contactinfo set phone='"+phone+"',email='"+email+"' where uid ='"+uid+"'";
				connection.query(insertQuery, function(err, rows, fields) {
					if(err)
					{
						console.log("ERROR: " + err.message);
						insertRelationshipStatus(uid,res);
					}
					else 
					{	// return err or result
						connection.end();
						insertRelationshipStatus(uid,res);
					}
				});
			}	
		}
	});
	
	
}

insertRelationshipStatus = function(uid,res)
{
	var connection=getConnection();
	var sqlQuery = "select * from lifeevent where uid ='"+uid+"'";
	
	connection.query(sqlQuery,function(err,rows){
		if(err)
		{
			console.log("ERROR: " + err.message);
		}
		else
		{			
			if (rows.length == 0)
			{
				var insertQuery = "insert into lifeevent(uid,relationship) values ('"+uid+"','"+status+"')";
				connection.query(insertQuery, function(err, rows, fields) {
					if(err)
					{
						console.log("ERROR: " + err.message);
					}
					else 
					{	// return err or result
						var json_responses = {"success" : 1};
						res.send(json_responses);
					}
				});
			}
			else
			{
				var insertQuery = "update lifeevent set relationship='"+status+"'";
				connection.query(insertQuery, function(err, rows, fields) {
					if(err)
					{
						console.log("ERROR: " + err.message);
						var json_responses = {"success" : 1};
						res.send(json_responses);
					}
					else 
					{	// return err or result
						connection.end();
						var json_responses = {"success" : 1};
						res.send(json_responses);
						
					}
				});
			}	
		}
	});
	
	
}