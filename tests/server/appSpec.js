var request = require('supertest');
var app = require('../../app.js');

describe('Test Suite for the app', function() {
	it('Should return 200 on GET /', function(done) {
		request(app)
			.get('/')
			.expect(200, done);
	});

	// The page should redirect to /
	it('Should return 302 on GET /twoter', function(done) {
		request(app)
			.get('/twoter')
			.expect(302, done);
	});
});