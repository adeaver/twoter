var mongoose = require('mongoose');

var User = require('../models/user.js');
var Twote = require('../models/twote.js');

// Post Request for "/twoter" end point
var logInUser = function(req, res) {
	var verification = {};

	var username = req.body.username;
	var password = req.body.password;

	User.find({username:username}, function(err, user) {
		if(err) {
			verification = negativeVerified();
		} else {
			if(user.length > 0) {
				// User exists
				if(password == user[0].password) {
					verification = positiveVerified(user[0]);
				} else {
					verification = negativeVerified();
				}
			} else {
				// User needs to be added
				var newUser = new User({
					username:username,
					password:password
				});

				newUser.save(function(err, user) {
					if(err) {
						verification = negativeVerified();
					} else {
						verification = positiveVerified(user);
					}
				});
			}
		}

		getAllTwotes(res, verification);		
	});
}

// Get Request for "/twoter" end point
var seeTwotes = function(req, res) {
	getAllTwotes(res, {isVerified:false, redirect:false});
}

// General Methods

// --> This method will be called by both get and post requests 
var getAllTwotes = function(res, dataBundle) {
	Twote.find(function(err, twotes) {
		dataBundle.twotes = err ? [] : twotes;
		res.send(dataBundle);
	});
}

// --> returns a positive verification result for verified user
var positiveVerified = function(user) {
	return {
		isVerified:true,
		username:user.username,
		userId:user._id,
		redirect:false
	};
}

// --> returns a negative verification result for non-verified user
var negativeVerified = function() {
	return {isVerified:false,
		redirect:true};
}

module.exports.logInUser = logInUser;
module.exports.seeTwotes = seeTwotes;