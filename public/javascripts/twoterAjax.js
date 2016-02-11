var baseUrl = "http://127.0.0.1:3000/twoter/addTwote";

var addTwote = function(userId, username) {
	var twote = $("#twotearea").val();
	$.post(baseUrl,
		{
			userId:userId,
			twote:twote,
			username:username
		}, function(data, status) {
			var addElement = "<li>" + twote;
			addElement += " -- " + username + "</li>";

			$("#twotes").prepend(addElement);
			$("#twotearea").val("");
		});
}

var logOut = function() {
	window.location.href = "/";
}