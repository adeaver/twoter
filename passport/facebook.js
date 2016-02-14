var FacebookStrategy = require('passport-facebook').Strategy;
var credentials = require('./credentials.js');
var User = require('../models/user.js');

module.exports = function(passport) {
	passport.use(new FacebookStrategy({
		clientID:credentials.clientID,
		clientSecret:credentials.clientSecret,
		callbackURL:credentials.callbackUrl
	}, function(accessToken, refreshToken, profile, done) {
		// TODO add user data here
		done(null, profile);
	}));
}