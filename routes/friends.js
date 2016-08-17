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

var friendsList = exports.getFriendsList = function(req,res)
{
	var connection=getConnection();
	var sqlQuery = "select a.email,concat_ws(' ',a.fname,a.lname) as wholename,b.friend1, b.friend2, b.friend1name, b.friend2name, b.status from users a left outer join friends b on a.email=b.friend1 where b.status in ('ACC','REQ') and a.email!='"+req.session.username+"' and b.friend2='"+req.session.username+"' order by b.status ASC;"
	
	console.log(sqlQuery);
	
	connection.query(sqlQuery,function(err,rows){
		if(err)
		{
			console.log("ERROR: " + err.message);
		}
		else
		{			
			if (rows.length != 0)
			{				
				var searchResults = [];
				
				for(var index=0; index<rows.length; index++)
				{
					searchResults.push({wholeName : rows[index].wholename,
						                friend1Email : rows[index].friend1,
						                friend2Email : rows[index].friend2,
						                status : rows[index].status});
				}
				
				var json_responses = {"results" : searchResults};
				connection.end();
	            res.send(json_responses);
			}
		}
	});
	
}

exports.acceptRequest = function(req,res)
{
	var connection=getConnection();
	var sqlQuery = "update friends set status='ACC' where friend1 in('"+req.session.username+"','"+req.param('friendEmail')+"') and friend2 in ('"+req.param('friendEmail')+"','"+req.session.username+"')";
	console.log(sqlQuery);
	
	connection.query(sqlQuery,function(err,rows){
		if(err)
		{
			console.log("ERROR: " + err.message);
		}
		else
		{			
			friendsList(req, res);
		}
	});
	connection.end();
}