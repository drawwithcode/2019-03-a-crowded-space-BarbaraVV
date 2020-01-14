var NUM_SHAPES = 6; // total number of shapes
var shapes = new Array(NUM_SHAPES); // array of shapes

var FPS = 50; // var for the frameRate

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(FPS);
  ellipseMode(CENTER);
  strokeWeight(3);

  var CenterX = width / 2; // x position of the shapes
  var CenterY = height / 2; // y position of the shapes

  // instances of the object
  shapes[0] = new Shape(CenterX, CenterY, width / 2.5, height / 3, color('#F6BCF6'));
  shapes[1] = new Shape(CenterX, CenterY, width / 3, height / 3, color('#ED78ED'));
  shapes[2] = new Shape(CenterX, CenterY, width / 4, height / 3, color('#A862EA'));
  shapes[3] = new Shape(CenterX, CenterY, width / 6, height / 4, color('#D6ADEB'));
  shapes[4] = new Shape(CenterX, CenterY, width / 9, height / 5, color('#80DFFF'));
  shapes[5] = new Shape(CenterX, CenterY, width / 17, height / 6, color('#CCFFE6'));
}

function draw() {
  background("black");

  // display all the objects in the array
  for (var i = 0; i < shapes.length; i++) {
    shapes[i].display();
  }
}

// function of the object
function Shape(_x, _y, _minSize, _maxSize, _c) {
  this.segments = 200; // number of segments that create the shape
  this.num_angles = TWO_PI / this.segments; // number of angles of the shape
  this.noise_scale = 0.5; // quantity of noise
  this.time_scale = 0.02; // time for the noise
  this.time_diff = 1500; // difference in time

  this.dx = 0;
  this.dy = 0;

  this.time_unique = random(this.time_diff); // different time of each object
  this.x = _x;
  this.y = _y;
  this.min_rad = _minSize;
  this.max_rad = _maxSize;
  this.color = _c; // color of the stroke

  // function to display the objects
  this.display = function() {
    translate(this.x, this.y);
    stroke(this.color);

    this.nextCoords(0);
    var px = this.dx,
      py = this.dy;
    var i = 0;

    while (i++ != this.segments) {
      this.nextCoords(i);

      line(px, py, px = this.dx, py = this.dy);
    }

    resetMatrix();
  };

  // function to create the noise
  this.nextCoords = function(seg) {
    var angle = this.num_angles * seg;
    var cosAngle = cos(angle);
    var sinAngle = sin(angle);
    var time = this.time_scale * frameCount + this.time_unique;

    var noiseValue = noise(
      this.noise_scale * cosAngle * this.noise_scale,
      this.noise_scale * sinAngle * this.noise_scale, time);

    var rad = this.max_rad * noiseValue - this.min_rad;

    this.dx = rad * cosAngle;
    this.dy = rad * sinAngle;
  };
}
