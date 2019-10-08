var spiralUno;
var spiralDue;

function preload() {

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background('black');

  spiralUno = new Spiral(0, 0, 10);
  spiralDue = new Spiral(0, 0, 5);

  spiralDue.color = 'SpringGreen';
  spiralDue.start = 22;

}

function draw() {

  spiralUno.move();
  spiralUno.display();
  spiralDue.move();
  spiralDue.display2();

  for (var i = 0; i < 100; i++) {
    spiralTre = new Spiral(0, 0, 60);
  }

}

function Spiral(_x, _y, _diameter) {
  this.x = _x;
  this.y = _y;
  this.size = _diameter;
  this.color = 'MediumBlue';

  this.start = 10;
  this.angle = 90;
  this.speed = 0.1;
  this.distance = this.speed * 4;

  this.move = function() {
    this.x = cos(this.angle) * this.start;
    this.y = sin(this.angle) * this.start;
    this.angle += this.speed;
    this.start = this.start + this.distance;

  }

  this.display = function() {
    translate(width / 2, height / 2);
    fill(this.color);
    noStroke();
    ellipse(this.x, this.y, this.size);

  }

  this.display2 = function() {
    translate(0, 0);
    fill(this.color);
    noStroke();
    ellipse(this.x, this.y, this.size);

  }

}
