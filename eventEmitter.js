var util = require('util');
var EventEmitter = require('events').EventEmitter;

function Counter() {
	var self = this; //keep track of object reference
	
	EventEmitter.call(this); // call EventEmitter constructor
	
	var count = 0;
	
	this.start = function() {
		
		this.emit('start');
		
		setInterval(function() {
			self.emit('count', count);
			++count;
		}, 1000);
	};
}

util.inherits(Counter, EventEmitter); //setup inheritance from EventEmitter class to Counter class

//now you can instantiate a Counter obj using:

//var counter = new Counter();

/*

In order for events to be useful methods of asynchronous programming
there must be at least one subscriber listening for the events. 

To set up an event listener in Node, use the on(), addListener() and
once() methods. 

on() and addListener() work exactly the same way:

They both create a listener for a specific event

The following is an example of an event listener using on() for both
the start and the count event types.

*/

var counter = new Counter(); //instantiate Counter obj

//the function given as the second parameter is the callback function
//this executes whenever the event is found and anything in the func body
//is executed at that time
counter.on('start', function() {
	console.log('start event');
});

counter.on('count', function() {
	console.log('count event: count = ' + count);
});

counter.start(); //starts both listeners 

/* 
The once event is similar to on() except for one major difference -

The once() event only handles an event ONE time. After that it no longer
listens for events. This is a good solution for handling one-time events. 

For example: The counter emits one 'start' event followed by several 
'count' events. You could potentially use once() for the 'start' event
since it is a one-time event. 

A great use for EventEmitters is error handling. You can code programs to
emit error events whenever an error occurs and set up event listeners
to handle these errors. 

An example follows:

*/

var EventEmitter = require('events'.EventEmitter;

var emitter = new EventEmitter();

//subscribe an error event to the on() event handler
emitter.on('error', function(error) {
	console.error(error.message);
});
//emit an error event for the on() listener to handle.
emitter.emit('error', new Error('our error is bad and we feel bad because of it'));

/*

Node has a built in global 'process' object that is used to interact w/
the currently running process. When an error event is not caught, this
object raises an 'uncaughtException' event. If you listen for this event
it can be a good way of catching un-handled errors.

An example follows:

*/

var EventEmitter = require('events').EventEmitter;
//instantiate an EventEmitter obj
var emitter = new EventEmitter();

//if an uncaught error exception is raised by process then terminate app
process.on('uncaughtException', function(error) {
	console.error(error.message);
	process.exit(-1);
});

//raise an error to show what happens to uncaught error
emitter.emit('error', new Error('our error is bad and we feel bad'));

