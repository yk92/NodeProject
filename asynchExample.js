/** Messing around with Asynchronous Node.js and the timeout function **/

var fs = require('fs'); //include the fs module



fs.open(
	'info.txt', 'r',
	function (err, handle) {
		if (err) {
			console.log("Error: " + err.code
						+ " (" + err.message + " )");
			return;	
		}
		var buf = new Buffer(100000);		
		fs.read(
			handle, buf, 0, 100000, null, 
			function (err, length) {
				if (err) {
					console.log("Error: " + err.code
								+ " (" + err.message + " )");
					return;	
				}
				console.log( buf.toString('utf8', 0, length) );
		
				fs.close(handle, function() { } );
			}

		);
	}

	
);
