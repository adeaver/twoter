var mongoose = require('mongoose');

var twoteSchema = new mongoose.Schema({
	user:{type:String},
	username:{type:String},
	text:{type:String},
	timestamp:{type:Date}
});

module.exports = mongoose.model("Twote", twoteSchema);