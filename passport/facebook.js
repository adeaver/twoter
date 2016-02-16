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
		var displayName = profile.displayName;
		var id = profile.id;

		var username = displayName.replace(/[^A-Za-z0-9]/g, "");

		User.findOne({username:username}, function(err, user) {
			if(err) {
				return done(err);
			} else {
				if(!user) {
					saveUser(username, id, done);
				} else {
					if(id == user.password) {
						return done(null, user);
					} else {
						createUsername(username, id, done);
					}
				}
			}
		})
	}));
}

var createUsername = function(username, password, done) {
	User.find({username:{'$regex':username}}, function(err, users) {
		var newUsername = users.length == 0 ? username : username + users.length;

		saveUser(newUsername, password, done);
	});
}

var saveUser = function(username, password, done) {
	var newUser = new User({
		username:username,
		password:password
	});

	newUser.save(function(err, user) {
		if(err) {
			return done(err);
		} else {
			return done(null, user);
		}
	});
}