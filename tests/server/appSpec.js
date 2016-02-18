var request = require('supertest');
var app = require('../../app.js');

describe('The app', function() {
	it('should return 200 on GET /', function(done) {
		request(app)
			.get('/')
			.expect(200, done);
	});

	it('should redirect to / with a 302 on GET /twoter', function(done) {
		request(app)
			.get('/twoter')
			.expect('location', '/')
			.expect(302, done);
	});

	it('should create the user and redirect to /twoter route', function(done) {
		request(app)
			.post('/login')
			.send({username:'sample', password:'sample_password'})
			.expect(302)
			.expect('location', '/twoter', done);
	});

	it('should return a 200 on get /twoter/findTwotesByUser', function(done) {
		request(app)
			.get('/twoter/findTwotesByUser')
			.expect(200, done);
	});

	it('should return a 200 and no user data for sample twoter', function(done) {
		request(app)
			.get('/twoter/findTwotesByUser?username=sample')
			.expect(200)
			.expect([], done);
	});

	it('should return 302 on GET /logout', function(done) {
		request(app)
			.get('/logout')
			.expect(302)
			.expect('location', '/', done);
	});

	it('should add a twote to the database', function(done) {
		request(app)
			.post('/twoter/addTwote')
			.send({userId:"12345", username:"random", text:"sample twote"})
			.expect(200, done);
	});
});