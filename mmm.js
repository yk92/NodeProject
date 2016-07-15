/*

	// exports means that these functions 
	   can be used outside of the module
	   using the . operator and attaching
	   them to any object
	   like numObj.add for example

		use by doing a require('./mmm') in same directory as this file
		
		or use npm link to set a global symbolic link to this module
		
		using npm link is a two step process:
		
		1. move mmm.js into a new folder named math-module 
			(or whatever other file you write -module attached at end)
			Then, create a package.json file because this module will be
			used outside of a single project. The command to write a
			package.json file is npm init (then follow the prompts)
		
		2. Once all of this is done go back to directory you are 
			currently developing in and type npm link 'module name'
			in that directory as well. 
		
		By setting up a link you are separating the module you want
		to write from the program that is using it. It decouples the
		module from the program.
*/

exports.add = add; 
exports.multiply = multiply;
exports.factorial = factorial;
exports.now = Date.now();

function add (number1, number2) {
	
	return parseInt(number1, 10) + parseInt(number2, 10);
}

function multiply(number1, number2) {
	
	return parseInt(number1, 10) * parseInt(number2, 10);
}

function factorial (number) {
	
	if(number === 0) {
		
		return 1;
	}
	
	else {
		
		return number * factorial(number - 1);
	}
}