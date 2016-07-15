/*

Node.js is mainly used for developing web applications - although other
types of apps do exist (like a linux kernel). This file will focus more
specifically on HTTP server as opposed to plain tcp/ip programming.

But, as a side note - for tcp/ip the 'net' core module is useful.

Http server functionality is defined in the http and https modules. The
difference between the two boils down to secure VS. unsecure server.

Http is a request-response protocol. Clients request specific resources
from the server and the server processes the requests and sends back an
appropriate response.  

A good server would likely need to perform different actions depending on
the request method (also known as the verb  - like get, put, post, delete)

The combination of an HTTP verb and requested URL is known as a route. 
In the previous example 'app.js' the same response was returned for every
request because it was hard coded into the code. 

The following code shows a server that supports two routes w/ an
additional handler that returns 404 status code for unmatched requests.

Note that the requested URL is stored in 'req.url' while the HTTP verb is
found in 'req.method'

*/

var http = require('http');

//create a server with support for multiple routes
http.createServer(function(req, res){
	if (req.url === '/' && req.method === 'GET') {
		res.writeHead(200, {'Content-Type' : 'text/html'});
		res.end('Hello <strong>home page</strong>');
	}
	else if (req.url === '/account' && req.method === 'GET') {
		res.writeHead(200, {'Content-Type' : 'text/html'});
		res.end('Hello <strong>home page</strong>');
	}
	else {
		res.writeHead(404, {'Content-Type' : 'text/html'});
		res.end();
	}
}).listen(1337);

/*

	Headers are certainly an important part of HTTP transactions.
	
	Cookies, which are responsible for maintaining state in a web app,
	are sent from the client to the server in the Cookie req header. 
	
	When a server sets a cookie, it does it via the Set-Cookie res header.
	
	Node makes it very easy to obtain the values of request headers - they
	are available in req.headers. Node also lowercases the header names
	so there's no need to test for both 'Host' and 'host'
	
	To read the value of the Cookie request header, you would check:
	'req.headers.cookie'
	
	If the header name has a hyphen in the name (User-Agent for example)
	you would use req.headers['user-agent']. 
	
	The following code shows an example of accessing this header:
	
*/

var http = require('http');

http.createServer(function (req, res) {
	res.end('Your user agent is ' + req.headers.['user-agent']);
}).listen(1337, '127.0.0.1');

console.log('Server running at localhost:1337');

