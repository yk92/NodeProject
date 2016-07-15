/* Small example for command line args

	Much like other programming languages, node has a system of 
	accessing args passed to files when run from command line.
	
	The first two arguments stored are always the 'node executable 
	followed by the name of the invoked js file. Therefore, the actual
	command line args you pass start at index 2 of the process.argv array
	
	Following is an example:
	
*/

process.argv.forEach(function(value, index, args) {
	console.log('process.argv[' + index + '] = ' + value);
});

/*

	In this script - the forEach loop accesses each arg in the argv
	array sequentially and prints it out to the console.
	
*/