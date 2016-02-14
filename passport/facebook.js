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
						createUsername(username, id, 1, done);
					}
				}
			}
		})
	}));
}

var createUsername = function(username, password, intModifier, done) {
	var newUsername = username + intModifier;

	User.findOne({username:newUsername}, function(err, user) {
		if(err) {
			return done(err);
		} else {
			if(!user) {
				saveUser(username, password, done);
			} else {
				createUsername(username, password, intModifier+1, done);
			}
		}
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