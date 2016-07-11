/** Helper class for dealing with files **/

var fs = require('fs');

function FileObject () {
	
	this.filename = '';
	
	this.file_exists = function (callback) {
		
		var self = this; //to save the pointer to this file object
		
		console.log('About to open: ' + self.filename);
		fs.open(this.filename, 'r', function (err, handle) {
			
			if (err) {
				console.log('Cannot open ' + self.filename);
				callback(err);
				return;
			}
			
			fs.close(handle, function () {} );
			callback(null, true);
		});
	};
}