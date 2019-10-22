function Blast(color) {

this.x = 0;
this.y = 0;
this.scaleX = 1;
this.scaleY = 1;
this.color = utils.parseColor(color);
this.lineWidth = 1;
}

Blast.prototype.draw = function(c) {
	c.save();
	c.translate(this.x, this.y);
	c.fillStyle = "red";

	c.fillRect(0,0,20,10);
	c.strokeStyle = "white";
	c.beginPath();
	c.moveTo(0,0);
	c.lineTo(0, Math.random()*-20);
	c.moveTo(4,0);
	c.lineTo(4, Math.random()*-20);
	c.moveTo(8,0);
	c.lineTo(8, Math.random()*-20);
	c.moveTo(12,0);
	c.lineTo(12, Math.random()*-20);
	c.moveTo(16,0);
	c.lineTo(16, Math.random()*-20);
	c.closePath()
	c.stroke();

	c.restore();
}

