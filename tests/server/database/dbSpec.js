require('./../../../app'); // to connect to the database
var assert = require('chai').assert;

var User = require('./../../../models/user.js');
var Twote = require('./../../../models/twote.js');

describe('The models', function() {
	it('should add a user to the database', function(done) {
		var newUser = new User({
			username:"some_username",
			password:"some_password"
		});

		newUser.save(function(err, user) {
			if(err) {
				done(err);
			} else {
				assert.equal("some_username", user.username);
				done();
			}
		});
	});

	it('should remove the same user from the database without error', function(done) {
		User.remove({username:"some_username"}, function(err) {
			if(err) {
				done(err);
			}
			done(err);
		});
	});

	it('should remove sample user created in earlier tests without error', function(done) {
		User.remove({username:"sample"}, function(err) {
			if(err) {
				done(err);
			}
			done(err);
		})
	});

	it('should remove sample twote created in earlier tests without error', function(done) {
		Twote.remove({userId:"12345"}, function(err) {
			if(err) {
				done(err);
			}
			done(err);
		});
	});
});