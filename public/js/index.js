//setup global variables
var hexagons = []
var hexCount = 0;
var hexAmount = 25;


//World width and height
const WIDTH = 2100;
const HEIGHT = (WIDTH/3)*2;

var view = {
  x:0,
  y:0,
  newX: 0,
  newY: 0,
  minZoom: 284/WIDTH,
  zoom: 0.4,
  newZoom: 284/WIDTH,
  onZoom: function () {
    //scroll logic to zoom in and out of canvas
    var e = window.event;
    var delta = e.wheelDelta*-0.0002;
    if(view.newZoom >= view.minZoom){
      view.newZoom += delta;
    }else{
      view.newZoom = view.minZoom;
    }
    if (view.newZoom <= 1.5) {
      view.newZoom += delta;
    } else {
      view.newZoom = 1.5;
    }
  },
  update: function () {
    var speed = 0.1;
    view.x += (view.newX - view.x) * speed;
    view.y += (view.newY - view.y) * speed;
    view.zoom += (view.newZoom - view.zoom) * speed;
  }
};




function setup() {
  createCanvas(600,400);
  document.getElementById('defaultCanvas0').addEventListener("wheel", view.onZoom); // add scoll listener

  //create hexagons
  for (var i = 0; i < hexAmount; i++) {
    var hex = new Hexagon(random(-WIDTH,WIDTH), random(-HEIGHT,HEIGHT), random(30, 50));
    hexagons.push(hex);
  }
  for (var i = 0; i < hexagons.length; i++) {
    hexagons[i].findClosest();
  }
}


function draw() {
  //setup view
  background(0);
  translate(width/2, height/2);
  view.update();
  scale(view.zoom);
  translate(-view.x, -view.y);


  //border
  stroke(255);
  noFill(255, 0, 0);
  strokeWeight(5);
  rect(-WIDTH, -HEIGHT, WIDTH*2, HEIGHT*2);

  //draw circle at mouse position DEBUG ONLY
  // ellipse(realM().x, realM().y, 15, 15);

  //do hexagon calculations
  for (var i = 0; i < hexagons.length; i++) {
    hexagons[i].show();
  }

  //move canvas with mouse drag
  if (mouseIsPressed) {
    view.newX += (pmouseX - mouseX)*(1/view.zoom);
    view.newY += (pmouseY - mouseY)*(1/view.zoom);
  }

  //check if won
  if (hexCount == hexAmount) {
    alert("Congratulations, You have won")
    hexCount = 0;
    for (var i = 0; i < hexagons.length; i++) {
      hexagons[i].conquered = false;
    }
  }
}




function realM () {
  //get real mouse position in world
  var mx = (mouseX - (width/2-view.x*view.zoom))*1/view.zoom;
  var my = (mouseY - (height/2-view.y*view.zoom))*1/view.zoom;
  return {
    x: mx,
    y: my
  }
}

var previousMouse = {
  x: 0,
  y: 0
}

function mousePressed() {
  //zoom out to default view when double clicked
  if(dist(previousMouse.x, previousMouse.y, mouseX, mouseY) < 10){
    view.newX = 0;
    view.newY = 0;
    view.newZoom = view.minZoom;
  }
  // Zoom in on hexagon click
  for (var i = 0; i < hexagons.length; i++) {
    if(hexagons[i].onclick()){
      view.newX = hexagons[i].x;
      view.newY = hexagons[i].y;
      view.newZoom = 0.8;
    }
  }

  previousMouse.x = mouseX;
  previousMouse.y = mouseY;
}
