var express = require('express');
var path = require('path');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var expressSession = require('express-session');
var flash = require('flash');
var initPassport = require('./passport/initPassport.js');
var auth = require('./passport/auth.js');
var app = express();

app.use( bodyParser.json() ); 
app.use(bodyParser.urlencoded({
  extended: true
})); 

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));
app.use(expressSession({secret: "notReallyASecret",
	resave:false,
	saveUninitialized:false}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

initPassport(passport);

mongoose.connect('mongodb://localhost/twoter');

var index = require('./routes/index.js');
var runner = require('./routes/twoter.js');
var adder = require('./routes/addTwote.js');
var finder = require('./routes/findTwoteByUser.js');

app.get('/', index.home);

app.get('/twoter', auth.isAuthenticated, runner.getTwotes);
app.post('/login', passport.authenticate('local', {
	successRedirect:'/twoter',
	failureRedirect:'/',
	failureFlash:true
}));

app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback', passport.authenticate('facebook', {
	successRedirect:'/twoter',
	failureRedirect:'/'
}));

app.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
});

// data routes
app.post('/twoter/addTwote', adder.addTwote);
app.get('/twoter/findTwotesByUser', finder.findTwotesByUser);

app.listen(3000);