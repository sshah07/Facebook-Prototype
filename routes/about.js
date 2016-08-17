/**
 * New node file
 */
exports.redirectToAbout = function(req,res)
{
	//Checks before redirecting whether the session is valid
	if(req.session.username)
	{
		//Set these headers to notify the browser not to maintain any cache for the page being loaded
		res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
		res.render("about",{username:req.session.username});
	}
	else
	{
		res.redirect('/');
	}
};