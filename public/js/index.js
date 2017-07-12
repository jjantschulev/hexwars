//setup global variables

var view = {
  x:0,
  y:0,
  newX: 0,
  newY: 0,
  zoom: 0.21,
  newZoom: 0.21,
  onZoom: function () {
    //scroll logic to zoom in and out of canvas
    var e = window.event;
    var delta = e.wheelDelta*-0.002;
    if(view.newZoom > 0.2){
      view.newZoom += delta;
    }else{
      view.newZoom = 0.201;
    }
    if (view.newZoom < 2) {
      view.newZoom += delta;
    } else {
      view.newZoom = 1.99;
    }
  },
  update: function () {
    var speed = 0.1;
    view.x += (view.newX - view.x) * speed;
    view.y += (view.newY - view.y) * speed;
    view.zoom += (view.newZoom - view.zoom) * speed;
  }
};
var hexagons = []
var hexCount = 0;
var hexAmount = 5;



function setup() {
  createCanvas(600,400);
  document.getElementById('defaultCanvas0').addEventListener("wheel", view.onZoom); // add scoll listener

  //create hexagons
  for (var i = 0; i < hexAmount; i++) {
    var hex = new Hexagon(random(-width*2,width*2), random(-height*2,height*2), random(30, 50));
    hexagons.push(hex);
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
  rect(-width*2-50, -height*2-50, width*4+50, height*4+50);

  //draw circle at mouse position DEBUG ONLY
  ellipse(realM().x, realM().y, 15, 15);

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

function mousePressed() {
  // Zoom in on hexagon click
  for (var i = 0; i < hexagons.length; i++) {
    if(hexagons[i].onclick()){
      view.newX = hexagons[i].x;
      view.newY = hexagons[i].y;
      // view.newZoom = 1;
    }
  }
}
