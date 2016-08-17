/**
 * New node file
 */
var mysql = require('mysql');

var email="";
var music="";
var sports="";
var movies="";
var books="";

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

exports.getinterest = function(req,res)
{
	var connection=getConnection();
    var sqlQuery = "select a.name,b.music,b.sports,b.movies,b.books from user_overview a join interests b on a.uid=b.uid join contactinfo c on a.uid=c.uid join lifeevent d on a.uid=d.uid where a.uid='"+req.session.username+"'"
    
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
				res.send(json_responses);
			}
		}
	});
    
    connection.end();
};

exports.submitinterest = function(req,res)
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
exports.redirectToInterest = function(req, res)
{
	// Checks before redirecting whether the session is valid
	if (req.session.username)
	{
		// Set these headers to notify the browser not to maintain any cache for
		// the page being loaded
		res
				.header(
						'Cache-Control',
						'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
		res.render("interest", {
			username : req.session.username
		});
	} else
	{
		res.redirect('/');
	}
};
