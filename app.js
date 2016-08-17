/**
 * Module dependencies.
 */

var express = require('express'), routes = require('./routes'), user = require('./routes/user'), signup = require('./routes/signup'), homepage = require('./routes/homepage'), editAbout = require('./routes/editabout'), friends = require('./routes/friends'), about = require('./routes/about'), interest = require('./routes/interest'),groups = require('./routes/groups'), searchuser = require('./routes/searchuser'), http = require('http'), session = require('client-sessions'), mysql = require('mysql'), path = require('path');

var app = express();

app.configure(function()
{
	app.use(session({

		cookieName : 'session',
		secret : 'cmpe273_test_string',
		duration : 30 * 60 * 1000,
		activeDuration : 5 * 60 * 1000,
	}));
	app.set('port', process.env.PORT || 3003);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'ejs');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function()
{
	app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/homepage', homepage.redirectToHomepage);
app.get('/friends', homepage.redirectToFriends);
app.get('/interest',interest.redirectToInterest);
app.get('/signout', signup.signout);
app.get('/editAbout', homepage.redirectToEditAbout);
app.get('/getAbout', editAbout.getAbout);
app.get('/about', about.redirectToAbout);
app.get('/showSearch', searchuser.showSearch);
app.get('/getSearchedUsers', searchuser.getSearchedUsers);
app.get('/groups', homepage.redirectToGroups);
app.get('/getGroups', groups.getGroups);
app.get('/getFriends', groups.getFriends);
app.get('/getStatuses', homepage.getStatuses);
app.get('/getFriendsList', friends.getFriendsList);

app.post('/redirectToSearch', homepage.redirectToSearch);
app.post('/signup', signup.signup);
app.post('/signin', signup.signin);
app.post('/submitAbout', editAbout.submitAbout);
app.post('/postStatus', homepage.postStatus);
app.post('/acceptRequest', friends.acceptRequest);

app.post('/getGroupMembers', groups.getGroupMembers);
app.post('/deleteMember', groups.deleteMember);
app.post('/deleteGroup', groups.deleteGroup);
app.post('/createGroup', groups.createGroup);

http.createServer(app).listen(app.get('port'), function()
{
	console.log("Express server listening on port " + app.get('port'));
});
