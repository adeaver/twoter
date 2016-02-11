var home = function(req, res){
	var redirected = req.query.redirected !== undefined;
  	res.render("home", {redirected:redirected});
};

module.exports.home = home;