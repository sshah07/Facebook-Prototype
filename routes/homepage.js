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

exports.redirectToSearch = function(req, res)
{
	console.log("search user");
	req.session.search = req.param("search");
	var json_responses = {
		"success" : 1
	};
	res.send(json_responses);
}

exports.showSearch = function(req, res)
{
	console.log("search user");
}

exports.redirectToHomepage = function(req, res)
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
		res.render("homepage", {
			username : req.session.username
		});
	} else
	{
		res.redirect('/');
	}
};

exports.redirectToEditAbout = function(req, res)
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
		res.render("editabout", {
			username : req.session.username
		});
	} else
	{
		res.redirect('/');
	}
};

exports.redirectToGroups = function(req, res)
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
		res.render("groups", {
			username : req.session.username
		});
	} else
	{
		res.redirect('/');
	}
};

exports.redirectToFriends = function(req, res)
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
		res.render("friends", {
			username : req.session.username
		});
	} else
	{
		res.redirect('/');
	}
};

var getStatuses = exports.getStatuses = function(req, res)
{
	var connection = getConnection();

	var sqlQuery = "select * from status where username in (select friend2 from friends where friend1='"+req.session.username+"' and status='ACC') or username='"+req.session.username+"' order by postdate desc";

	connection.query(sqlQuery, function(err, rows, fields)
	{
		if (err)
		{
			console.log("ERROR: " + err.message);
		} else
		{ // return err or result
			console.log("DB Results:" + rows);

			if (rows.length != 0)
			{
				var statuses = [];

				for (var index = 0; index < rows.length; index++)
				{
					statuses.push({
						userName : rows[index].username,
						status : rows[index].status,
						postdata : rows[index].postdate
					});
				}

				var json_responses = {
					"results" : statuses
				};
				connection.end();
				res.send(json_responses);
			}
		}
	});

	
}

exports.postStatus = function(req,res)
{
	var connection = getConnection();

	var sqlQuery = "insert into status(username, status) values ('"+req.session.username+"','"+req.param("status")+"')";

	connection.query(sqlQuery, function(err, rows, fields)
	{
		if (err)
		{
			console.log("ERROR: " + err.message);
		} else
		{ // return err or result
			console.log("DB Results:" + rows);

			getStatuses(req,res);
		}
	});

	connection.end();
}