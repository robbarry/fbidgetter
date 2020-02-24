// content.js

var render = function(selector, type, id) {
	console.log(type + ": " + id);
	$(selector).ready(function() {
		display(selector, type, id);
		var exists = $("#fbidgetter").length;
		console.log(exists);
	})
}

var display = function(selector, type, id) {
	new_el = "<div id='fbidgetter'></div>";	
	if (type == "UID") $(selector).first().append(new_el);
	if (type == "PID" || type == "EID") $(selector).after(new_el);
	
	$("#fbidgetter").css("background-color", "#ddd").css("color", "#600");
	if (type == "UID") $("#fbidgetter").css("font-size", "50%").css("margin-left", "10px");
	if (type == "PID") $("#fbidgetter").css("font-size", "75%");
	if (type == "EID") $("#fbidgetter").css("font-size", "110%");
	$("#fbidgetter").text(type + " " + id);	
}

var main = function() {
	var text = document.documentElement.outerHTML;
	var re = /"userID":"([0-9]*?)"/;
	var matches = text.match(re);
	if (matches != null) {	
		render("h1 div", "UID", matches[1]);
		return true;
	}

	re = /"pageID":"(.*?)"/;
	matches = text.match(re);
	if (matches != null) {
		render("._64-f", "PID", matches[1]);
		return true;
	}

	re = /"entity_id":"(.*?)"/;
	matches = text.match(re);
	render("._19sz", "EID", matches[1]);
	return true;
	
}

$(document).ready(function() {
	main();
})