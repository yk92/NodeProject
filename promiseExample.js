/*

		Promises are objects that represent a value that is yet 
		to be known when the promise is created. 
				  
		A promise can be thought of as a contract associated with an 
		asynchronous function.
		
		The function returns immediately but 'promises' that a value will
		be provided at some point in the future. 
		
		Promises used to be part of the Node core but were phased out for 
		callback functions. However, promises are now back as part of the
		Node core and became fully supported in the V8 engine.
		
		When a promise is created it is in a state known as:
		'pending' or 'unfulfilled'
		
		The promise stays in this state until its associated asynchronous 
		code is finished executing. If the code completes successfully
		then the promise moves into the 'fulfilled' state however, if the
		asynchronous call fails - the promise moves into the 'rejected'
		state. 
		
		Following is an example:
		
*/

//creating a Promise
var promise = new Promise(function(resolve, reject) {
	var success = true;
	
	if (success) { //if the promise is fulfilled
		resolve('promise fulfilled');
	}
	else { //if the promise is NOT fulfilled
		reject(new Error('promise rejected'));
	}
});

/* 

	The following code is an example of reading a file asynchronously
	with promises used for the data to be read.
	
	If the promise is fulfilled the file was read successfully,
	otherwise an error is raised.
	
*/

//require fs module
var fs = require('fs');

//create the promise and the async function to read a file
var promise = new Promise(function(resolve, reject) {
	fs.readFile('README.txt', 'utf8' function(error, data) {
		if (error) {
			return reject(error);
		}
		
		resolve(data);
	});
});

/* 

	The Following code is an example of the promises' then() functionality
	
	then() takes two arguments: a success callback function and 
	a failure callback function. 
	
	The success callback is used if the promise is successful otherwise
	the failure is used. 

*/

//an example of promise.then that takes both success and failure callbacks
promise.then(function(result) {
	console.log(result);
}, function(error) {
		console.error(error.message);
});

/*

	Just a note that either of then()'s arguments can be undefined
	meaning you dont necessarily have to pass it both a success and
	failure function. The one that is missing will just not do anything.
	
	One of the positives to using promises is that they can be chained
	together. 
	
	Using multiple calls to then() you can chain multiple promises.
	
	The following code shows an example:

*/

//Example showing promise.then() chaining
promise.then(function(result) {
	console.log(result);
	return 'The End!';
}).then(function(result) {
	console.log(result);
});

/*
	With promises you can also use the catch() method to  handle any
	rejections that occur in the promise chain.
	
	The following code shows a catch() within a promise.then() chain:
*/

promise.then(function(result) { //if success
	console.log(result);
	return 'The End!';
}).catch(function(error) { //catch if failure
	console.error(error.message);
});

//Following is another example using catch but it is interleaved between
//then() calls.

promise.then(function(result) {
	console.log(result);
}).catch(function(error) {
	console.error(error.message);
}).then(function() {
	console.log('The End!');
});

