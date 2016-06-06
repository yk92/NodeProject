#A small Node.js project

This repo will evolve as I mess around some more with Node.
Hopefully it ends up being something kind of cool. =)


Some notes about the Node debugger:

To start the debugger from command line add `debug` flag when executing file

ex: $`node debug web.js`

Debugger key commands:

cont - continue running the code during debuger execution

next - Step over the next statement

step - Step INTO the next statement (or step over if into is not possible)

out - Step out of the current executing function

backtrace - Show current call execution frame or call stack

repl - Start Node REPL to view variable values and execute code

watch(expr) Add 'expr' to the watch list - shown whenever you step or move through the debugger

list(n) - List the 'n' lines of source code BEFORE AND AFTER the current line debugger is stopped on.
