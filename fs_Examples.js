/*

	Node.js has very useful tools for dealing with files and directories
	
	Any file in a Node app can determine its absolute location using
	__filename and __dirname variables.
	
	Both of these variables are strings that specify the file being
	executed and the directory the file is located in. 
	
	One thing to note is that neither of these variables is global.
	
	They are both local variables that are simply defined in every file.
	
	This means that in a multi-file application the value will differ
	in every file.
	
	Another useful tool during execution is process.cwd() method.
	
	This method takes no args and returns a string representing the apps
	current working directory. 
	
	You can also change the CWD using process.chdir() method.
	
	process.chdir() takes 1 argument - a string signifying the directory
	you wish to change too.
	
	If an error occurs the method throws an exception.
	
	Following is an example of these variables and methods:
	
*/

//Following code snippet uses both variables and also
//prints out the file paths when used from command line
console.log('Currently executing file is ' + __filename);
console.log('It is located in ' + __dirname);

//displaying and changing working directory
console.log('Starting in ' + process.cwd());

try {
	process.chdir('/');
}
catch(error) {
	console.error('chdir: ' + error.message);
}

console.log('Current working directory is now ' + process.cwd());

/*

	The two main ways of accessing files in Node is by using fs's
	readFile() and readFileSync() methods. Both methods take the first
	argument as the file to read and an optional second argument for the
	encoding type. If no second arg is given then the contents of the file
	are returned in a 'Buffer' data type used to store raw binary data.

	There are some differences between the two methods. Namely, 
	readFileSync() returns the contents of the file or throws an error if 
	something goes wrong while readFile() takes a callback function as its
	final argument (to handle errors or something else)
	
	The following are examples of both readFile() and readFileSync()
	
*/

//small program to read its own source file
var fs = require('fs')

fs.readFile(__filename, function(error, data) {
	if (error) {
		return console.error(error.message); //callback func for error handling
	}
	
	console.log(data);
});

//the following is the async example using readFileSync()
var fs = require('fs');

var data;

try {
	data = fs.readFileSync(__filename);
	console.log(data);
}
catch(error) {
	console.error(error.message);
}

/* 
	Both of the above code snippets return the file as a Buffer object
	which is simply raw byte data (not readable). To convert the Buffer
	object to readable text you can either use a method like toString()
	or simply use the optional second argument of both methods to specify
	UTF-8 encoding.
	
	The following is an example which specifies UTF-8 encoding
*/

var fs = require('fs');

fs.readFile(__filename, { encoding: 'utf8' }, function(error, data) {
	if (error) {
		console.error(error.message);
	}
	
	console.log(data);
});

/* 

	Writing files is done by using two methods much like reading.
	One is a synchronous version and the second is asynchronous.
	
	The two methods are: writeFile() and writeFileSync().
	
	Both methods take a filename as their first argument, the data to 
	write (as a string or Buffer) is the second argument. The third arg
	is optional and is used to pass additional info about the file such
	as encoding type.
	
	Both of these methods DEFAULT to using 'utf8' encoding.
	
	writeFile() takes a callback function as its fourth argument for
	error handling just like readFile() does. writeFileSync() does not
	return a value but does throw an exception if an error occurs.
	
	The following example shows how writeFile() is used:
	
*/

var fs = require('fs');

var data = 'some randome file data';

fs.writeFile(__dirname + '/foo.txt', data, function(error) {
	if (error) {
		console.error(error.message);
	}
	console.log('foo.txt written to ' + __dirname + '/'); 
});

/*
	By default writeFile() will write a new file or overwrite an existing
	file of the same name. However, this behavior can be modified by 
	passing a flag value using the optional third argument.
	
	For example - passing the wx flag causes an error to be thrown if
	the file already exists, while the 'a' flag causes the data to be
	appended to the end of an existing file instead of overwriting it. 
	
	A full list of flags is provided in the fs documentation.
	
	The following is an example using the 'wx' flag:
	
*/

var fs = require('fs');

var data = 'some random file data to be written to a file';

fs.writeFile(__dirname + '/foo.txt', data, { flag: 'wx' }, //set flag
	function(error) {	
		if (error) {
			return console.error(error.message);
		}
	console.log('File has been written to ' + __dirname + '/');
});

/* 
	The 'fs' module has additional useful functionality such as streams.
	
	A Stream is a mechanism for moving data between two points. It can be
	thought of as a simple garden hose. When the hose is connected to a 
	water source, the source pushes water into the hose which flows out
	of the other end. At this point the water can be used by a different 
	object like a sprinkler.
	
	Node uses streams extensively within its core for things like files
	and sockets.
	
	Streams are attractive because they allow an app to process data in
	small pieces instead of all at once. 
	
	Unfortunately, streams are kind of complicated because Node has 
	several different stream APIs
	
	The following code examples use streams in their simplest forms.
	
	Readable streams are sources of data. These streams emit events such
	as: data, close, end, and error which are used to process the actual
	data coming out of the stream. 
	
	These streams work like this: 
	
	When a new piece of data - known as a 'chunk' becomes available, the
	stream emits a 'data' event with the actual data passed as a Buffer
	obj. The 'close' event is optional and can be emitted when the source
	of the data stream is closed. 
	
	Once the stream has sent all of its data in 'chunks' - the 'end' 
	event is emitted. After an 'end' event is emitted no other events
	should be emitted from this stream.
	
	During this whole process - if anything goes wrong an 'error' event
	is emitted.
	
	One of the methods used with streams is fs.createReadStream()
	
	This method opens a file as a readable stream. Compare this to 
	readFile() which simply reads the entire contents of whatever file is
	passed to it and stores it in memory. If your app needs to process
	large files this can become quite troublesome, and if the app needs to
	process several large files simultaneously (like a web server) 
	it is even more so.
	
	The following example uses createReadStream():
	
*/

var fs = require('fs');

//create a stream object using foo.txt as data source
var stream = fs.createReadStream('foo.txt');

stream.on('data', function(data) {
	var chunk = data.toString();
	
	process.stdout.write(chunk);
});

stream.on('end', function() {
	console.log();
});

stream.on('error', function(error) {
	console.error(error.message);
}); 

/*
	As opposed to read streams, write streams are like sinks for data.
	Writable streams are basically destinations for data. Data is sent
	to a writable stream by calling its write() method.
	
	Once all the desired data has been written, the stream's end() method
	is used to signal the end of the stream. 
	
	The above example that uses process.stdout.write() is actually a write
	stream.
	
	Just like read streams - write streams also emit close and error
	events that behave exactly the same way. 
	
	One difference between read and write streams has to do with pressure.
	
	A writable stream can only handle so much data at one time, as buffers
	get full.
	
	Once this buffer limit is reached the stream is 'saturated' and any
	additional data written to it can be problematic and cause 
	unpredictable behaviors. 'Back Pressure' is how the writable stream
	signals to the source to stop sending data. 
	
	'Back Pressure' is implemented using the write() method's boolean
	return value. If this value is 'false' the source should not write
	any more data to the stream. This gives the stream time to handle the
	already sent data before it becomes full. Once the stream is ready to
	receive more data it emits a 'drain' event. The source can detect this
	and resume sending data to the stream. 
	
	An example of a writable stream follows:
	
*/

//piping a readable file stream into a writable file stream
var fs = require('fs');
var readStream = fs.createReadStream('foo.txt');
var writeStream = fs.createWriteStream('bar.txt.');
readStream.pipe(writeStream);
/*

	The above example gives an example of using pipe().
	
	pipe() is a very useful method that allows you to connect the output
	of one stream to the input of another stream. This saves a dev the 
	hassle of handling a variety of stream events such as drain.
	
	Just like perl and other languages - Node applications are connected
	to three standard streams by default. These streams are stdin, stdout
	and stderr.
	
	All three are accessible through the process object. 
	
	stdin is a readable stream that is employed to gather user input
	
	stdout and stderr are both output streams that display either output
	or errors respectively.
	
	When Node apps run - stdin is on pause by default but you can read 
	data from stdin by 'unpausing' it and handling data events. 
	
	The following example shows how to use stdin stream:
	
*/
	
	//code snippet that shows working with the standard streams
	process.stdin.once('data', function(data) {
		process.stdout.write('Hello ' + data.toString());
		process.stdin.pause();
	});
	
	process.stdout.write('What is your name?  ');
	process.stdin.resume();
	