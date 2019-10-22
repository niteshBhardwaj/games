function Ball(radius, color) {
	if(radius === undefined) {
    radius = 40;
  }
  
	if(color === undefined) {
		color = "green";
	}
  
	this.x = 0;
	this.y = 0;
  	this.width = 40;
  	this.height = 40;
	this.vx = 0;
	this.vy = 0;
	this.scaleX = 1;
	this.scaleY = 1;
	this.rotation = 0;
  	this.radius = radius;
	this.color = utils.parseColor(color);
	this.lineWidth = this.lineWidth;
	this.showFlame = false;
	this.shadowX = 0;
	this.shadowY = 0;
};

Ball.prototype.draw = function(c) {
	c.save();
	c.translate(this.x, this.y);
	c.scale(this.scaleX, this.scaleY);
	c.rotate(this.rotation);
	c.lineWidth = 3;
	c.shadowColor = this.color;
  	c.shadowBlur = 5;
  	c.shadowOffsetX = this.shadowX ;
  	c.shadowOffsetY = this.shadowY ;
	c.strokeStyle  = "rgb(200,200,200)";
	c.fillStyle = this.color;
	c.beginPath();
	c.arc(0,0, this.radius, 0, Math.PI *2, false);
    c.closePath();
  	c.fill();
  if(this.lineWidth > 0) {
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
