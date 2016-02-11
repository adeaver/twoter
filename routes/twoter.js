var mongoose = require('mongoose');

var User = require('../models/user.js');
var Twote = require('../models/twote.js');

// -- METHODS FOR MAIN "/twoter" end point

// Post Request for "/twoter" end point
var logInUser = function(req, res) {
	var verification = {};

	var username = req.body.username;
	var password = req.body.password;

	if(username == "") {
		verification = negativeVerified();
		getAllTwotes(res, verification);
	}

	User.find({username:username}, function(err, user) {
		if(err) {
			verification = negativeVerified();
			getAllTwotes(res, verification);
		} else {
			if(user.length > 0) {
				// User exists
				if(password == user[0].password) {
					verification = positiveVerified(user[0]);
				} else {
					verification = negativeVerified();
				}

				getAllTwotes(res, verification);
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

					getAllTwotes(res, verification);
				});
			}
		}		
	});
}

// Get Request for "/twoter" end point
var seeTwotes = function(req, res) {
	getAllTwotes(res, {isVerified:false, redirect:false});
}

// General Methods

// --> This method will be called by both get and post requests 
var getAllTwotes = function(res, dataBundle) {
	Twote.find({}).sort({timestamp: -1}).exec(function(err, twotes) {
		dataBundle.twotes = err ? [] : twotes;
		
		var userQuery = User.find({}).select('username');
		userQuery.exec(function(err, users) {
			dataBundle.users = err ? [] : users;
			res.render("twoter", dataBundle);
		})
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