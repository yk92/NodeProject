/** Messing around with global variables in Node **/


function printStuff(var_name) {
	
	console.log(global[var_name]);
}

global.pet = "Goldfish";
global.color = "Golden";

printStuff("color");
printStuff("pet");

/** 

Other globals functions available in console object are:

	warn(msg) -> similar to log but prints on stderr
	
	time(label) - timeEnd(label) -> first function marks a time and second prints elapsed time since the first function
	
	assert(cond, message) -> good for unit testing. if `cond` evaluates to false throw AssertionFailure error with `message`
	
**/

//process is another global with many useful functions
