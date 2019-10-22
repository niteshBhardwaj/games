var Cross = function(translateX, translateY, color) {

	this.lineWidth = 3;
	this.translateX = translateX;
	this.translateY = translateY;
	this.color = (color)? color: 'rgb(38, 223, 24)';
}

Cross.prototype = {
	draw: function() {
	ctx.save();
	ctx.translate(this.translateX, this.translateY);
	ctx.lineWidth = this.lineWidth;
	ctx.strokeStyle = this.color;
	ctx.beginPath();
	ctx.moveTo(0,0);
	ctx.lineTo(80,60);
	ctx.moveTo(80,0);
	ctx.lineTo(0,60);
	ctx.stroke();
	ctx.restore();
	}
}