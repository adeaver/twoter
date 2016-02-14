var mongoose = require('mongoose');

var User = require('../models/user.js');
var Twote = require('../models/twote.js');

var getTwotes = function(req, res) {
	console.log(req);
	
	var dataBundle = {username:req.user.username,
		userId:req.user._id};

	Twote.find({}).sort({timestamp: -1}).exec(function(err, twotes) {
		dataBundle.twotes = err ? [] : twotes;
		
		var userQuery = User.find({}).select('username');
		userQuery.exec(function(err, users) {
			dataBundle.users = err ? [] : users;
			res.render("twoter", dataBundle);
		})
	});
}


module.exports.getTwotes = getTwotes;