var baseAddUrl = "http://127.0.0.1:3000/twoter/addTwote";
var baseFindUrl = "http://127.0.0.1:3000/twoter/findTwotesByUser";

var twoteBoxStyle = "'margin-bottom: 35px;padding:30px;background-color: #D3D3D3;box-shadow: 10px 10px grey;'";
var twoteByStyle = "'float:right;'";

var twoterNameStyleBasic = {'margin-bottom': '25px', 'padding':'10px', 'background-color': '#D3D3D3', 'box-shadow':'10px 10px grey'};
var twoterNameStyleHighlighted = {'margin-bottom': '25px', 'padding':'10px', 'background-color': '#FFFF99', 'box-shadow':'10px 10px grey'};

var addTwote = function(userId, username) {
	var twote = $("#twotearea").val();
	$.post(baseAddUrl,
		{
			userId:userId,
			twote:twote,
			username:username
		}, function(data, status) {
			var addElement = createTwoteElement(username, twote);

			$("#twotes").prepend(addElement);
			$("#twotearea").val("");
		});
}

var logOut = function() {
	window.location.href = "/";
}

var findTwotesByUser = function(username, id) {
	var params = username == "" ? "" : "?username=" + username;
	var fullUrl = baseFindUrl + params;

	$.ajax({
		url:fullUrl,
		success: function(result) {
			$("#twotes").html(createListElements(result));
			highlightTwoter(id);
		}
	})
}

var highlightTwoter = function(id) {
	var twoterTags = $('.findByTwoter');
	var idTag = "user_" + id;

	for(var index = 0; index < twoterTags.length; index++) {
		if(idTag == "user_all" || twoterTags[index].id != idTag) {
			$("#" + twoterTags[index].id).css(twoterNameStyleBasic);
		} else {
			$("#" + twoterTags[index].id).css(twoterNameStyleHighlighted);
		}
	}
}

var createListElements = function(listResults) {
	var listElements = "";
	var stop = listResults.length;

	if(stop == 0) {
		listElements += "<div style=" + twoteBoxStyle + ">No Twotes found for this user</div>";
	} else {
		for(var index = 0; index < stop; index++) {
			listElements += createTwoteElement(listResults[index].username, listResults[index].text);
		}
	}

	return listElements;
}

var createTwoteElement = function(username, text) {
	var element = "<div style=" + twoteBoxStyle + ">" + text + "<br />";
	element += "<span style='float:right;'>-- by " + username + "</span></div>";

	return element;
}