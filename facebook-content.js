// see if facebook ID on page

id_stack = [];

var render = function(selector, type, id) {
	display(selector, type, id);
}

var display = function(id) {
	type = "FBID"
	new_el = "<div id='fbidgetter'></div>";	
	id_text = type + " " + id;
	if ($("#fbidgetter").length == 0) $("body").prepend(new_el);		
	if ($("#fbidgetter").text() != id_text) {			
		$("#fbidgetter").text(id_text);
	}
}

var main = function() {
	setTimeout(main, 100);


	regex = []
	regex.push(["UID", /"userID":"([0-9]*?)"/]);
	regex.push(["UID", /set=ecnf.([0-9]*?)"/]);
	regex.push(["UID", /"User",id:"([0-9]*?)"/]);

	regex.push(["PID", /"pageID":"(.*?)"/]);
	regex.push(["PID", /Pagelet_([0-9]*?)"/]);
	
	regex.push(["EID", /"entity_id":"(.*?)"/]);

	results = {}
	for (i = 0; i < regex.length; i++) {
		results[regex[i][0]] = ""
	}	

	var text = $("html").html();
	for (i = 0; i < regex.length; i++) {
		type = regex[i][0]
		pattern = regex[i][1]
		matches = text.match(pattern)
		if (matches != null) {
			hit = matches[1]
			if (id_stack.includes(hit)) {
				// we've already got this one
			} else {
				id_stack.push(hit)
			}
		}
	}

	display(id_stack[id_stack.length - 1]);
	if (id_stack.length > 100) {
		id_stack.pop();
	}

}

$(document).ready(function() {
	main();
});