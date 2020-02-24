// content.js

var render = function(type, id) {
	display(type, id);
}

var display = function(type, id) {
	new_el = "<div id='fbidgetter'></div>";	
	$("body").append(new_el);
	$("#fbidgetter").css("background-color", "#ddd").css("color", "#600");
	$("#fbidgetter").css("font-size", "100%").css("clear", "both");
	$("#fbidgetter").css("float", "left").css("position", "absolute");
	$("#fbidgetter").css("left", "5px").css("top", "5px");
	$("#fbidgetter").text(type + " " + id);	
}

var main = function() {
	console.log("Searching for ID");
	var text = $("body").html();
	var re = /([0-9]*?)-follow/;
	var ignore_re = /Edit profile<\/span>/
	var matches = text.match(re);
	var ignore_matches = text.match(ignore_re);
	if (matches != null && ignore_matches == null) {	
		render("UID", matches[1]);
	} else if (ignore_matches != null) {
		$("#fbidgetter").remove();
	}
	var exists = $("#fbidgetter").length;	
	setTimeout(main, 400);
}

$(document).ready(function() {
	main()
})


