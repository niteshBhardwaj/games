function Ball (radius, color) {
  if (radius === undefined) { radius = 40; }
  if (color === undefined) { color = "#ff0000"; }
  this.x = 0;
  this.y = 0;
  this.radius = radius;
  this.vx = 0;
  this.vy = 0;
  this.rotation = 0;
  this.scaleX = 1;
  this.scaleY = 1;
  this.color = utils.parseColor(color);
  this.lineWidth = 1;
  this.shadowX = 0;
  this.shadowY = 0;
  this.alpha = 1;
}

Ball.prototype.draw = function (c) {
  c.save();
  c.translate(this.x, this.y);
  c.rotate(this.rotation);
  c.scale(this.scaleX, this.scaleY);
  c.alpha = this.alpha;
  c.shadowColor = 'rgb(200,210,200)';
  c.shadowBlur = 20;
  c.shadowOffsetX = this.shadowX ;
  c.shadowOffsetY = this.shadowY ;
  
  c.lineWidth = this.lineWidth;
  c.fillStyle = this.color;
  c.beginPath();
  //x, y, radius, start_angle, end_angle, anti-clockwise
  c.arc(0, 0, this.radius, 0, (Math.PI * 2), true);
  c.closePath();
  c.fill();
  if (this.lineWidth > 0) {
    c.stroke();
  }
  c.restore();
};

Ball.prototype.getBounds = function () {
  return {
    x: this.x - this.radius,
    y: this.y - this.radius,
    width: this.radius * 2,
    height: this.radius * 2
  };
};
