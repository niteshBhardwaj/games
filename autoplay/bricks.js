function Bricks(width, height,color) {

this.x = 0;
this.y = 0;
this.width = width;
this.height = height;
this.scaleX = 1;
this.scaleY = 1;
this.color = utils.parseColor(color);
this.lineWidth = 3;
this.rotation = 0;
this.alpha = 0.5;

}

Bricks.prototype.draw = function (c) {
	c.save();
	c.translate(this.x, this.y);
	c.rotate(this.rotation);
	c.scale(this.scaleX, this.scaleY);
	c.fillStyle = this.color;
	c.globalAlpha = this.alpha;
	c.lineWidth = this.lineWidth;
	c.strokeStyle = "rgb(50,50,50)";
	c.beginPath();
	c.fillRect(0,0,this.width, this.height);
	c.fill();
	c.stroke();
	c.restore();
}
