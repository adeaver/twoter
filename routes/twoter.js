var mongoose = require('mongoose');

var User = require('../models/user.js');
var Twote = require('../twote.js');


var verifyUser = function(username, password) {
	User.findOne({username:username}, function(err, user) {

	});
}