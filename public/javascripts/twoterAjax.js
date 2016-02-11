var baseAddUrl = "http://127.0.0.1:3000/twoter/addTwote";
var baseFindUrl = "http://127.0.0.1:3000/twoter/findTwotesByUser";

var addTwote = function(userId, username) {
	var twote = $("#twotearea").val();
	$.post(baseAddUrl,
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

var findTwotesByUser = function(username) {
	var params = username == "" ? "" : "?username=" + username;
	var fullUrl = baseFindUrl + params;

	$.ajax({
		url:fullUrl,
		success: function(result) {
			$("#twotes").html(createListElements(result));
		}
	})
}

var createListElements = function(listResults) {
	var listElements = "";

	for(var index = 0; index < listResults.length; index++) {
		listElements += "<li>" + listResults[index].text;
		listElements += " -- by " + listResults[index].username;
	}

	return listElements;
}