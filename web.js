//Require the http module for node - allows me to create the web server
var http = require("http");

//function that processes the requests and sends a response
function process_request(request, response) {

	var body = "Thanks for calling!\n";
	var content_length = body.length;
	
	//this is what actually creates the response header that you see if you do a curl -i request
	response.writeHead( 200, {
		'Content-Length' : content_length,
		'Content-Type' : 'text/plain'
	});
	
	response.end(body);
}
//creates the actual server
var s = http.createServer(process_request);
//tell server to listen on port 8080
s.listen(8080);