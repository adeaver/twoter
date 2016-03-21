var mongoose = require('mongoose');
//It would have been cool to experiment with using refrenced or embeded schemas
var userSchema = new mongoose.Schema({
	username:{type:String},
	password:{type:String}
});

module.exports = mongoose.model("User", userSchema);