var mongoose = require('mongoose');

var twoteSchema = new mongoose.Schema({
	user:{type:String},
	text:{type:String},
	timestamp:{type:Date}
});

module.exports.Twote = new mongoose.Model("Twote", twoteSchema);