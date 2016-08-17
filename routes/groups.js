/**
 * New node file
 */
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

exports.getFriends = function(req,res){
	
	var connection=getConnection();
	
	var sqlQuery = "select friend2,friend2name from friends where friend1='"+req.session.username+"' and status='ACC';";
	
	connection.query(sqlQuery, function(err, rows, fields) {
		if(err){
			console.log("ERROR: " + err.message);
		}
		else 
		{	// return err or result
			console.log("DB Results:"+rows);
			
			if (rows.length != 0)
			{
				var searchResults = [];
				
				for(var index=0; index<rows.length; index++)
				{
					searchResults.push({friendEmail : rows[index].friend2,
						                friendName : rows[index].friend2name,
						                checked : false});
				}
				
				var json_responses = {"results" : searchResults};
				connection.end();
				res.send(json_responses);
			}
		}
	});
	
	
}

exports.getGroups = function(req,res){
	
	var connection=getConnection();
	
	var sqlQuery = "select * from groups where useremail='"+req.session.username+"';";
	
	connection.query(sqlQuery, function(err, rows, fields) {
		if(err){
			console.log("ERROR: " + err.message);
		}
		else 
		{	// return err or result
			console.log("DB Results:"+rows);
			
			if (rows.length != 0)
			{
				var searchResults = [];
				
				for(var index=0; index<rows.length; index++)
				{
					var hasEditRights = false;
					
					if (rows[index].createdby == req.session.username)
					{
						hasEditRights=true;
					}
					
					searchResults.push({id : rows[index]._id,
						                groupName : rows[index].groupname,
						                createdBy : rows[index].createdby,
						                userEmail : rows[index].useremail,
						                userName : rows[index].username,
						                hasEditRights : hasEditRights});
				}
				
				var json_responses = {"results" : searchResults};
	            res.send(json_responses);
			}
		}
	});
	
	connection.end();
}

exports.getGroupMembers = function(req,res){
	
	var connection=getConnection();
	
	var sqlQuery = "select * from groups where groupname='"+req.param('groupName')+"';";
		
	connection.query(sqlQuery, function(err, rows, fields) {
		if(err){
			console.log("ERROR: " + err.message);
		}
		else 
		{	// return err or result
			console.log("DB Results:"+rows);
			
			if (rows.length != 0)
			{
				var searchResults = [];
				
				for(var index=0; index<rows.length; index++)
				{
					if (rows[index].useremail==req.session.username)
					{
						continue;
					}
					
					var hasEditRights = false;
					
					if (rows[index].createdby == req.session.username)
					{
						hasEditRights=true;
					}
					
					searchResults.push({id : rows[index]._id,
						                groupName : rows[index].groupname,
						                createdBy : rows[index].createdby,
						                userEmail : rows[index].useremail,
						                userName : rows[index].username,
						                hasEditRights : hasEditRights});
				}
				
				var json_responses = {"results" : searchResults};
	            res.send(json_responses);
			}
		}
	});
	
	connection.end();
}

exports.deleteMember = function(req,res){
	
	var connection=getConnection();
	
	var sqlQuery = "delete from groups where groupname='"+req.param('groupName')+"' and useremail='"+req.param('userEmail')+"';";
	console.log(sqlQuery);
		
	connection.query(sqlQuery, function(err, rows, fields) {
		if(err){
			console.log("ERROR: " + err.message);
		}
		else 
		{	// return err or result
			console.log("DB Results:"+rows);
			
			var json_responses = {"success" : 1};
	        res.send(json_responses);
		}
	});
	
	connection.end();
}

exports.deleteGroup = function(req,res){
	
	var connection=getConnection();
	
	var sqlQuery = "delete from groups where groupname='"+req.param('groupName')+"' and createdby='"+req.session.username+"';";
	console.log(sqlQuery);
		
	connection.query(sqlQuery, function(err, rows, fields) {
		if(err){
			console.log("ERROR: " + err.message);
		}
		else 
		{	// return err or result
			console.log("DB Results:"+rows);
			
			var json_responses = {"success" : 1};
	        res.send(json_responses);
		}
	});
	
	connection.end();
}

exports.createGroup = function(req,res){
	
	console.log(req.param('groupMembers'));
	
	var groupMembers = req.param('groupMembers');
	var insertString = "insert into groups(groupname,createdby,useremail,username) values";
	
	for(var index = 0; index<groupMembers.length; index++)
	{
		insertString += "('"+req.param('groupName')+"','"+req.session.username+"','"+groupMembers[index].userEmail+"','"+groupMembers[index].userName+"'),";
	}
	
	insertString += "('"+req.param('groupName')+"','"+req.session.username+"','"+req.session.username+"',(select concat_ws(' ',fname,lname) as wholename from users where email='"+req.session.username+"'))";
	
	console.log(insertString);
	
	var connection=getConnection();
//	
//	var sqlQuery = "delete from groups where groupname='"+req.param('groupName')+"' and createdby='"+req.session.username+"';";
//	console.log(sqlQuery);
//		
	connection.query(insertString, function(err, rows, fields) {
		if(err){
			console.log("ERROR: " + err.message);
		}
		else 
		{	// return err or result
			console.log("DB Results:"+rows[0]);
			
			var json_responses = {"success" : 1};
	        res.send(json_responses);
		}
	});
	
	connection.end();
}