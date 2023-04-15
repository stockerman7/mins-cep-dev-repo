alert("anotherFile.jsx has been evaluating\nThe Second Button in this panel will call a function that belongs to this JSX.");

secondJSXFunction = function() {
	alert("Hello world from anotherFile.jsx");
}

// This won't work in a secondary function:
// 
// var secondJSXFunction = function() {
// 	alert("Hello world from anotherFile.jsx");
// }

// Nor this:
// 
// function secondJSXFunction() {
// 	alert("Hello world from anotherFile.jsx");
// }