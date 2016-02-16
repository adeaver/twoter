var mongoose = require('mongoose');
var Twote = require('../models/twote.js');

var findTwotesByUser = function(req, res) {
	var username = req.query.username;

	var query = username === undefined ? {} : {username:username};

	Twote.find(query).sort({timestamp: -1}).exec(function(err, twotes) {
		res.send(twotes);
	});
};

module.exports.findTwotesByUser = findTwotesByUser;