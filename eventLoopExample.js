console.log('One event loop cycle');

setTimeout(function() {
	console.log('different cycle');
}, 100);

console.log('same cycle'); // this line will be printed before the 	
						   // setTimeout lines
						   
/*
	Explanation: This happens because the setTimeout function queues
				 up the code to run in a future cycle.
	
	** Event loop ** 
	
	definition and information:
	
	The event loop allows javascript to appear multithreaded even though
	everything runs in a single thread. 
	JS applications can only perform one task at a time. 
	The JS engine maintains several queues of unhandled tasks.
	
	These queues include things like: 
	
	events, timers, intervals and immediates. 
	
	Each execution of the event loop (known as a cycle) causes one or
	more tasks to be dequeued and executed. As tasks execute they themselves
	can add more tasks to the event queue. 
	
	Each cycle is made up of smaller steps known as ticks. 
	
	An example of a tick:
	
		Something like accessing an item from the timer queue.

	The main advantage of using Node.js is the Asynchronous capability 
	it extends to javascript.
	
	Especially Asynch I/O operations. Most languages perform synchronous
	I/O (also known as blocking I/O) which means they begin some I/O 
	operation (like reading from a disk or a network call) and then sit
	idle waiting for the operation to complete. 
	
	Typically languages that use synchronous I/O are also multi-threaded
	like C++ or Java so that you can handle concurrent operations in other
	threads while waiting on the I/O operation to finish. 
	
	
	So - How exactly does Node.js use asynchronous I/O?
	
	The three most popular ways are with:
	
	1. Callback functions - A callback function is a function that 
							is invoked at the completion of an
							asynchronous operation with the results of
							the operation passed as function args
							
							The following code is an example:
							*/							
var fs = require('fs');

fs.readFile('README.txt', 'utf8', function(error, data)
{
	//this function is a callback function
	//it is only called AFTER the readFile operation occurs
	if(error) {
		return console.error(error); //if after the read I/O op there is
									 //an error like file not exist
	}
	
	console.log(data); //if no error the file is stored in data var
});
	
	
	/*
	
	There are some conventions when using callback functions:
	
	The first is that when passing a callback function as an argument
	of another function it is the last argument passed.
	
	This makes code read better as you can see all of the input arguments,
	followed by the continuation function.
	
	The second convention relates to error handling. If an error can be
	passed to a callback function Node convention dictates that it will 
	be the first argument. It makes error handling more of a priority 
	for devs.
	
	A third convention deals with synchronous code (which is still needed)
	in Node for initialization, shell scripts, etc. The convention states
	that appending Sync to the names of synchronous functions helps make
	them stand out more amongst the asynchronous code typically found in
	Node.js programs.
	
	For example - there is a readFileSync() that could have been used
				  above instead of just readFile()
	
	One more important thing to keep in mind is that Asynchronous code
	cannot handle try...catch statements because during the time when 
	an error may pop up the call stack is changing as other code is still
	being handled asynchronously with the I/O operation.
	
	Node does support an asynchronous error-handling mechanism. 
	
	It is known as Domains (however, they behave inconsistently).
	Generally errors are passed around using callback functions until it
	makes sense to handle them. 
	
	2. Event emitters - The second type of asynchronous functionality implementation
						is done by using event emitters.
						
						The file EventEmitter.js shows an example
	
	3. Promises - The third type of asynchronous functionality implementation
				  is done by using Promises.
				  
				  As a note - Promises are only supported by Node 0.11.13+
				  
				  promiseExample.js has an example of a promise.
				  
				  