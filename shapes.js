/** Messing around with inheritance **/

function Shape () {
	
	
}

Shape.prototype.X = 0;
Shape.prototype.Y = 0;

Shape.prototype.move = function (x, y) {
	
	this.X = x;
	this.Y = y;
}

Shape.prototype.distance_from_origin = function () {
	
	return Math.sqrt(this.X*this.X + this.Y*this.Y);
}

Shape.prototype.area = function () {
	
	throw new Error("I dont have a form yet");
}

var s = new Shape();

s.move(10, 10);

console.log( s.distance_from_origin() );

function Square() {

}

Square.prototype = new Shape();

Square.prototype.__proto__ = Shape.prototype;

Square.prototype.Width = 0;

Square.prototype.area = function() {
	
	return this.Width * this.Width;
}

var sq = new Square();

sq.move(-5, -5);
sq.Width = 5;

console.log(sq.area());
console.log(sq.distance_from_origin());


function Rectangle() {

}

Rectangle.prototype = new Square();
Rectangle.prototype.__proto__ = Square.prototype;

Rectangle.prototype.Height = 0;

Rectangle.prototype.area = function () {
	
	return this.Width * this.Height;
}

var re = new Rectangle();

re.move(25, 25);
re.Width = 10;
re.Height = 5;

console.log(re.area());
console.log(re.distance_from_origin());