// content.js

var render = function(type, id) {
	display(type, id);
}

var display = function(id) {
	type = "TWID"
	new_el = "<div id='twidgetter'></div>";	
	id_text = type + " " + id;
	if ($("#twidgetter").length == 0) $("body").prepend(new_el);		
	if ($("#twidgetter").text() != id_text) {			
		$("#twidgetter").text(id_text);
	}
}

var main = function() {
	console.log("Searching for ID");
	var text = $("body").html();
	var re = /([0-9]*?)-(un)?follow/;
	var ignore_re = /Edit profile<\/span>/
	var matches = text.match(re);
	console.log(matches);
	var ignore_matches = text.match(ignore_re);
	if (ignore_matches != null) {
		$("#twidgetter").remove();
	} else {
		if (matches != null) {	
			display(matches[1])
		}
		var exists = $("#twidgetter").length;	
		setTimeout(main, 100);
	}
}

$(document).ready(function() {
	main()
})


