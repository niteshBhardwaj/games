var Circle = function(translateX, translateY, color) {
	this.lineWidth = 3;
	this.translateX = translateX;
	this.translateY = translateY;
	this.color = (color)? color: 'rgb(20,220,220)';
}

Circle.prototype = {
	draw: function() {
	ctx.save();
	ctx.translate(this.translateX, this.translateY);
	ctx.lineWidth = this.lineWidth;
	ctx.strokeStyle = this.color;
	ctx.beginPath();
	ctx.arc(0,0,40,0,2*Math.PI);
	ctx.stroke();
	ctx.restore();
	}
}
