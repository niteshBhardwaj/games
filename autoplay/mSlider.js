function mSlider(width,height,color) {

this.x = 0;
this.y = 0;
this.width = width;
this.height = height;
this.color = utils.parseColor(color);
this.scaleX = 1;
this.scaleY = 1;
this.lineWidth = 1;	
}

mSlider.prototype.draw = function(c) {
	c.save();
	c.translate(this.x, this.y);
	c.scale(this.scaleX, this.scaleY);
	c.fillStyle = this.color;
	c.shadowColor = this.color;
  	c.shadowBlur = 2;
  	c.shadowOffsetX = this.shadowX ;
  	c.shadowOffsetY = this.shadowY ;
	c.beginPath();
	c.moveTo(0,0);
	c.lineTo(this.width,0);
	c.lineTo(this.width,this.height);
	c.lineTo(0,this.height);
	c.lineTo(0,0);
	
	c.closePath();
	c.fill();
	c.restore();
}

mSlider.prototype.getBounds = function () {
  return {
    x: this.x - this.width,
    y: this.y - this.height,
    width: this.width * 1,
    height: this.height * 1
  };
};