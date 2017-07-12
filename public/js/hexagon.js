function Hexagon(x,y,size) {
  this.x = x;
  this.y = y;
  this.size = size;
  this.arrowLength = 0.0;

  this.conquered = false;
  this.closest = [];

  this.show = function () {
    if(this.conquered){
      fill(255, 0, 0);
    }else{
      fill(255);
    }

    this.arrowLength += 0.008;
    if(this.arrowLength > 1){
      this.arrowLength = 0;
    }

    for (var i = 0; i < this.closest.length; i++) {
      strokeWeight(5);
      stroke(255);
      line(this.x, this.y,
        this.x+(this.closest[i].x-this.x),
        this.y+(this.closest[i].y-this.y)
      );

      strokeWeight(map(this.arrowLength, 0, 1, 25, 5));
      stroke(
        255,
        map(this.arrowLength, 0, 1, 0, 255),
        map(this.arrowLength, 0, 1, 0, 255)
      );
      line(this.x, this.y,
        this.x+(this.closest[i].x-this.x)*this.arrowLength,
        this.y+(this.closest[i].y-this.y)*this.arrowLength
      );
    }
    noStroke();
    fill(255);
    polygon(this.x, this.y, this.size, 6);

  }

  this.onclick = function () {
    //boolean function to check if mouse is above this hexagon
    if(dist(realM().x, realM().y, this.x, this.y)<this.size){
      return true;
    }else{
      return false
    }
  }

  this.findClosest = function () {
    var others = hexagons.slice();

    others.splice(others.indexOf(this), 1)

    for (var j = 0; j < 3; j++) {
      var closestHex = null;
      var d = Infinity;
      for (var i = 0; i < others.length; i++) {
        var newD = dist(others[i].x, others[i].y, this.x, this.y);
        if (newD < d) {
          closestHex = others[i];
          d = newD;
        }
      }
      this.closest.push(closestHex);
      others.splice(others.indexOf(closestHex), 1)
    }

  }

}

function polygon(x, y, radius, npoints) {
  //UTILITY: Draw polygon function
  var angle = TWO_PI / npoints;
  beginShape();
  for (var a = 0; a < TWO_PI; a += angle) {
    var sx = x + cos(a) * radius;
    var sy = y + sin(a) * radius;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}
