var express = require('express');
var path = require('path');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();

app.use( bodyParser.json() ); 
app.use(bodyParser.urlencoded({
  extended: true
})); 

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb://localhost/twoter');

var index = require('./routes/index.js');
var runner = require('./routes/twoter.js');

app.get('/', index.home);
app.post('/twoter', runner.logInUser);
app.get('/twoter', runner.seeTwotes);

app.listen(3000);