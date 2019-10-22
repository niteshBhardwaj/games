var Boxes = function(translateX, translateY, color) {
	this.width = 100;
	this.height = 100;
	this.check = true;
	this.translateX = translateX;
	this.translateY = translateY;
	this.color = (color)? color: "rgba(150,150,150,.3)";
	this.circle = false;
	this.cross = false;

}
Boxes.prototype.draw = function() {
	ctx.save();
	ctx.translate(this.translateX, this.translateY);
	
	ctx.fillStyle = this.color;
	ctx.fillRect(0,0, this.width, this.height);
	ctx.restore();
}

