var mongoose = require('mongoose');
var Twote = require('../models/twote.js');

// -- ADD TWOTES TO DATABASE --
var twoteToDatabase = function(req, res) {
	var userId = req.body.userId;
	var twote = req.body.twote;
	var username = req.body.username;

	var timestamp = new Date();

	var twote = new Twote({
		user:userId,
		username:username,
		text:twote,
		timestamp:timestamp
	});

	twote.save(function(err, twote) {
		var data = err ? {} : twote;

		res.send(data);
	})
}

module.exports.addTwote = twoteToDatabase;