function Hexagon(x,y,size) {
  this.x = x;
  this.y = y;
  this.size = size;

  this.conquered = false

  this.show = function () {
    if(this.conquered){
      fill(255, 0, 0);
    }else{
      fill(255);
    }
    polygon(this.x, this.y, this.size, 6);
  }

  this.onclick = function () {
    //boolean function to check if mouse is above this hexagon
    if(dist(realM().x, realM().y, this.x, this.y)<this.size){
      this.conquered = true
      hexCount++;
      return true;
    }else{
      return false
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
