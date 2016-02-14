var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = require('../models/user.js');

module.exports = function(passport) {
	passport.use('local', new LocalStrategy({
		passReqToCallback: true
	}, function(req, username, password, done) {
		User.findOne({username:username}, function(err, user) {
			if(err) {
				return done(err);
			}
			if (!user) {
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
			} else {
				if(password == user.password) {
					return done(null, user);
				} else {
					return done(null, false, req.flash({"message":"Invalid password"}));
				}
			}
		});
	}));
}