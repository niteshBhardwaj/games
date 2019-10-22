var canvas = document.getElementById('canvas'),
	ctx = canvas.getContext('2d'),
	game = document.querySelector('#game'),
	gameScreen = document.querySelector('#gameScreen'),
	mainScreen = document.querySelector('#mainScreen'),
	twoPlayer = document.querySelector('.twoPlayers'),
	compPlay = document.querySelector('.compPlay'),
	reset = document.querySelector('.reset'),
	backButton = document.querySelectorAll('.backButton'),
	checkTurn = document.querySelectorAll('.checkTurn'),
	playAgain = document.querySelector('.playAgain'),
	gameOver = document.querySelector('#gameOver'),
	winner = document.querySelector('.winner'),
	mouse = utils.captureMouse(canvas),
	w = window.innerWidth,
	h = window.innerHeight,
	boxesCount = 9,
	boxes = [],
	val = 0,
	checkCross = true,
	computerPlay = false,
	count = 0,
	xWin,
	oWin,
	cWin;

document.ontouchmove = function(e) {e.preventDefault()};
game.ontouchmove = function(e) {e.stopPropagation()};
gameScreen.ontouchmove = function(e) {e.stopPropagation()};
gameOver.style.height = h + "px";
mainScreen.style.height = h + "px";
game.style.height = h + "px";

function init() {
	showTurn();
	drawBoxes();
	gameScreen.style.display = "none";	
}	

	// for loop for draw boxes.....
function drawBoxes() {
	for(var i = 1; i <= boxesCount; i++) {
	
	if(val > 2.5) {	val = 0; }

	if(i <= 3) {
		var box = new Boxes(100 * val+val, 0);
	} else if((i > 3) && (i <= 6) ) {
		var box = new Boxes(100 * val+val, 106);
	} else {
		var box = new Boxes(100 * val+val, 212);
	}
	boxes.push(box);
	val += 1.1;
	}
	boxes.forEach(function(box) { box.draw(); });
}

	
	
	// check click box value

	function checkDraw(box) {

		var dx = (box.translateX + box.width - (box.width/2)) - (mouse.x),
            dy = (box.translateY + box.height - (box.width/2)) - (mouse.y),
          dist = Math.sqrt(dx * dx + dy * dy),
          distMax = dist + box.width;

          
        if (dist <= 50) {
        	console.log(dist);		
		if(box.check) {

			// box.color = "rgba(100,100,100,.8)";
			//console.log((mouse.x-8) + "  :  "+ (mouse.y-35));
			if(checkCross) {
				var cross = new Cross(box.translateX+10, box.translateY+15);
				cross.draw();
				box.cross = true;
				
				if(!computerPlay) {	
					checkCross = false; 
					checkCircle = true; 
				}

				if(computerPlay) {
					box.check = false;
					checkComputer();
				} else {
					checkCross = false;
					checkCircle = true;
				}
			} else if (checkCircle) {

				var circle = new Circle(box.translateX+50, box.translateY+50);
				circle.draw();
				checkCross = true;
				checkCircle = false;
				box.circle = true;
			}
			box.check = false;
			showTurn();
		}
			//box.draw(ctx);
		}			
	
	}

	function drawCircle(i) {
		var circle = new Circle(boxes[i].translateX+50, boxes[i].translateY+50);
			circle.draw();	
			boxes[i].check = false;	
			boxes[i].circle = true;
			checkCircle1();		
	}

	function drawMatch() {
		for(var i in boxes) {
			if(!boxes[0].check && !boxes[1].check && !boxes[2].check && !boxes[3].check
				&& !boxes[4].check && !boxes[5].check && !boxes[6].check && !boxes[7].check && !boxes[8].check){
				count = 1;
			}
		}
		
		if(xWin) {	count = 0;	} else if (oWin) {	couont = 0;	}

		return count;
	}

	function checkCross1() {
		if(boxes[0].cross && boxes[1].cross && boxes[2].cross) {
			xWin = 'Player1 has won';
		} else if(boxes[3].cross && boxes[4].cross && boxes[5].cross) {
			xWin = 'Player1 has won';
		} else if(boxes[6].cross && boxes[7].cross && boxes[8].cross) {
			xWin = 'Player1 has won';
		} else if(boxes[0].cross && boxes[3].cross && boxes[6].cross) {
			xWin = 'Player1 has won';
		} else if(boxes[1].cross && boxes[4].cross && boxes[7].cross) {
			xWin = 'Player1 has won';
		} else if(boxes[2].cross && boxes[5].cross && boxes[8].cross) {
			xWin = 'Player1 has won';
		} else if(boxes[0].cross && boxes[4].cross && boxes[8].cross) {
			xWin = 'Player1 has won';
		} else if(boxes[2].cross && boxes[4].cross && boxes[6].cross) {
			xWin = 'Player1 has won';
		}
		
		// won with computher
			if(computerPlay && xWin) {
				xWin = 'You Won'
			}
			
			return xWin;
	}

	function checkCircle1() {
		if(boxes[0].circle && boxes[1].circle && boxes[2].circle) {
			oWin = 'Player 2 has won';
		} else if(boxes[3].circle && boxes[4].circle && boxes[5].circle) {
			oWin = 'Player 2 has won';
		} else if(boxes[6].circle && boxes[7].circle && boxes[8].circle) {
			oWin = 'Player 2 has won';
		} else if(boxes[0].circle && boxes[3].circle && boxes[6].circle) {
			oWin = 'Player 2 has won';
		} else if(boxes[1].circle && boxes[4].circle && boxes[7].circle) {
			oWin = 'Player 2 has won';
		} else if(boxes[2].circle && boxes[5].circle && boxes[8].circle) {
			oWin = 'Player 2 has won';
		} else if(boxes[0].circle && boxes[4].circle && boxes[8].circle) {
			oWin = 'Player 2 has won';
		} else if(boxes[2].circle && boxes[4].circle && boxes[6].circle) {
			oWin = 'Player 2 has won';
		}
		
			// Lost with computher
			if(computerPlay && oWin) {
				oWin = 'You Lost'
			}

		return oWin;
	}

	function checkComputer() {

						// check computer value
						// check computer winning...
						if (boxes[0].circle && boxes[1].circle && boxes[2].check) {
							getNo = 2;
							drawCircle(getNo);
						} else if (boxes[1].circle && boxes[2].circle && boxes[0].check) {
							getNo = 0;
							drawCircle(getNo);
						} else if (boxes[0].circle && boxes[2].circle && boxes[1].check) {
							getNo = 1;
							 drawCircle(getNo);
						} else if (boxes[0].circle && boxes[3].circle && boxes[6].check) {
							getNo = 6;
							drawCircle(getNo);
						} else if (boxes[3].circle && boxes[6].circle && boxes[0].check) {
							getNo = 0;
							drawCircle(getNo);
						} else if (boxes[0].circle && boxes[6].circle && boxes[3].check) {
							getNo = 3;
							drawCircle(getNo);
						} else if (boxes[3].circle && boxes[4].circle && boxes[5].check) {
							getNo = 5;
							drawCircle(getNo);
						} else if (boxes[4].circle && boxes[5].circle && boxes[3].check) {
							getNo = 3;
							drawCircle(getNo);
						} else if (boxes[3].circle && boxes[5].circle && boxes[4].check) {
							getNo = 4;
							drawCircle(getNo);
						} else if (boxes[0].circle && boxes[3].circle && boxes[6].check) {
							getNo = 6;
							drawCircle(getNo);
						} else if (boxes[1].circle && boxes[4].circle && boxes[7].check) {
							getNo = 7;
							drawCircle(getNo);
						} else if (boxes[4].circle && boxes[7].circle && boxes[1].check) {
							getNo = 1;
							drawCircle(getNo);
						} else if (boxes[1].circle && boxes[7].circle && boxes[4].check) {
							getNo = 4;
							drawCircle(getNo);
						} else if (boxes[6].circle && boxes[7].circle && boxes[8].check) {
							getNo = 8;
							drawCircle(getNo);
						} else if (boxes[7].circle && boxes[8].circle && boxes[6].check) {
							getNo = 6;
							drawCircle(getNo);
						} else if (boxes[6].circle && boxes[8].circle && boxes[7].check) {
							getNo = 7;
							drawCircle(getNo);
						} else if (boxes[5].circle && boxes[8].circle && boxes[2].check) {
							getNo = 2;
							drawCircle(getNo);
						} else if (boxes[2].circle && boxes[5].circle && boxes[8].check) {
							getNo = 6;
							drawCircle(getNo);
						} else if (boxes[0].circle && boxes[4].circle && boxes[8].check) {
							getNo = 8;
							drawCircle(getNo);
						} else if (boxes[4].circle && boxes[8].circle && boxes[0].check) {
							getNo = 0;
							drawCircle(getNo);
						} else if (boxes[0].circle && boxes[8].circle && boxes[4].check) {
							getNo = 4;
							drawCircle(getNo);
						} else if (boxes[2].circle && boxes[4].circle && boxes[6].check) {
							getNo = 6;
							drawCircle(getNo);
						} else if (boxes[4].circle && boxes[6].circle && boxes[2].check) {
							getNo = 2;
							drawCircle(getNo);
						} else if (boxes[2].circle && boxes[6].circle && boxes[4].check) {
							getNo = 4;
							drawCircle(getNo);
						 } 

						// check x wining value.....

						else if (boxes[0].cross && boxes[1].cross && boxes[2].check) {
							getNo = 2;
							drawCircle(getNo);
						} else if (boxes[1].cross && boxes[2].cross && boxes[0].check) {
							getNo = 0;
							drawCircle(getNo);
						} else if (boxes[0].cross && boxes[2].cross && boxes[1].check) {
							getNo = 1;
							drawCircle(getNo);
						} else if (boxes[0].cross && boxes[3].cross && boxes[6].check) {
							getNo = 6;
							drawCircle(getNo);
						} else if (boxes[3].cross && boxes[6].cross && boxes[0].check) {
							getNo = 0;
							drawCircle(getNo);
						} else if (boxes[0].cross && boxes[6].cross && boxes[3].check) {
							getNo = 3;
							drawCircle(getNo);
						} else if (boxes[3].cross && boxes[4].cross && boxes[5].check) {
							getNo = 5;
							drawCircle(getNo);
						} else if (boxes[4].cross && boxes[5].cross && boxes[3].check) {
							getNo = 3;
							drawCircle(getNo);
						} else if (boxes[3].cross && boxes[5].cross && boxes[4].check) {
							getNo = 4;
							drawCircle(getNo);
						} else if (boxes[0].cross && boxes[3].cross && boxes[6].check) {
							getNo = 6;
							drawCircle(getNo);
						} else if (boxes[1].cross && boxes[4].cross && boxes[7].check) {
							getNo = 7;
							drawCircle(getNo);
						} else if (boxes[4].cross && boxes[7].cross && boxes[1].check) {
							getNo = 1;
							drawCircle(getNo);
						} else if (boxes[1].cross && boxes[7].cross && boxes[4].check) {
							getNo = 4;
							drawCircle(getNo);
						} else if (boxes[6].cross && boxes[7].cross && boxes[8].check) {
							getNo = 8;
							drawCircle(getNo);
						} else if (boxes[7].cross && boxes[8].cross && boxes[6].check) {
							getNo = 6;
							drawCircle(getNo);
						} else if (boxes[6].cross && boxes[8].cross && boxes[7].check) {
							getNo = 7;
							drawCircle(getNo);
						} else if (boxes[5].cross && boxes[8].cross && boxes[2].check) {
							getNo = 2;
							drawCircle(getNo);
						} else if (boxes[2].cross && boxes[5].cross && boxes[8].check) {
							getNo = 8;
							drawCircle(getNo);
						} else if (boxes[2].cross && boxes[8].cross && boxes[5].check) {
							getNo = 5;
							drawCircle(getNo);
						} else if (boxes[0].cross && boxes[4].cross && boxes[8].check) {
							getNo = 8;
							drawCircle(getNo);
						} else if (boxes[4].cross && boxes[8].cross && boxes[0].check) {
							getNo = 0;
							drawCircle(getNo);
						} else if (boxes[0].cross && boxes[8].cross && boxes[4].check) {
							getNo = 4;
							drawCircle(getNo);
						} else if (boxes[2].cross && boxes[4].cross && boxes[6].check) {
							getNo = 6;
							drawCircle(getNo);
						} else if (boxes[4].cross && boxes[6].cross && boxes[2].check) {
							getNo = 2;
							drawCircle(getNo);
						} else if (boxes[2].cross && boxes[6].cross && boxes[4].check) {
							getNo = 4;
							drawCircle(getNo);
						} else if (boxes[2].cross && boxes[6].cross && boxes[1].check) {
							getNo = 1;
							drawCircle(getNo);
						} 
							// find the single empty boxes.....	

						else if(boxes[4].check) {
								getNo = 4;
								drawCircle(getNo);
							} else if (boxes[0].check) {
								getNo = 0;
								drawCircle(getNo);
							} else if (boxes[8].check) {
								getNo = 8;
								drawCircle(getNo);
							} else if (boxes[5].check) {
								getNo = 5;
								drawCircle(getNo);
							} else if (boxes[1].check) {
								getNo = 1;
								drawCircle(getNo);
							} else if (boxes[7].check) {
								getNo = 7;
								drawCircle(getNo);
							} else if (boxes[6].check) {
								getNo = 6;
								drawCircle(getNo);
							} else if (boxes[2].check) {
								getNo = 2;
								drawCircle(getNo);
							} else if (boxes[3].check) {
								getNo = 3;
								drawCircle(getNo);
							}
						
					}

	
	canvas.addEventListener('click', drawFunction, false);

	function drawFunction(e) {
		e.stopPropagation();
		//mouse.x = e.clientX;
		//mouse.y = e.clientY;
		boxes.forEach(checkDraw);	
		
		if(checkCross1()) {	alertBox(xWin); } 
		else if(checkCircle1()) { alertBox(oWin); } 
		else if(drawMatch()) { alertBox('Match has been drawn'); }
	}	
		
	function resetAll() {
		ctx.clearRect(0,0, canvas.width, canvas.height);
		boxes = [];
		val = 0;
		checkCross = true;
		//computerPlay = false;
		count = 0;
		xWin = '';
		oWin = '';
		cWin = '';
		boxes.forEach(function(box) {
			box.check = true;
			box.circle = false;
			box.cross = false;	
		});
		removeClass(checkTurn[0], 'addTurn');
		removeClass(checkTurn[1], 'addTurn');
		showTurn();
		drawBoxes();

	}

	canvas.addEventListener('mousemove', function() {

		boxes.forEach(changeCursor);

	}, false);

	 function changeCursor(box) {

		var dx = (box.translateX + box.width - (box.width/2)) - (mouse.x),
            dy = (box.translateY + box.height - (box.width/2)) - (mouse.y),
	      dist = Math.sqrt(dx * dx + dy * dy);
          
	        if (dist <= 50) {
      
			if(box.check) {
				canvas.style.cursor = 'pointer';
		} else {
			canvas.style.cursor = 'crosshair';
		}
	} 
}

function showTurn() {
	if(!computerPlay) {
		checkTurn[0].innerHTML = 'Player 1 Turn';			
		checkTurn[1].innerHTML = 'Player 2 Turn';
		if(checkCross) {
			checkTurn[0].className += ' addTurn';			
			removeClass(checkTurn[1], 'addTurn');
		} else {
			checkTurn[1].className += ' addTurn';			
			removeClass(checkTurn[0], 'addTurn');
		}
	} else {
		checkTurn[0].innerHTML = 'Your Turn';			
		checkTurn[1].innerHTML = '';
			removeClass(checkTurn[0], 'addTurn');
			checkTurn[0].className += ' addTurn';			
	}
}

function removeClass(ele,cls) {
        if (hasClass(ele,cls)) {
            var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
            ele.className=ele.className.replace(reg,'');
        }
    }

   function hasClass(ele,cls) {
    return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
}

function alertBox(win) {
	gameOver.style.display = "block";
	winner.innerHTML = win;
}

twoPlayer.onclick = function() {
	mainScreen.style.display = "none";	
	computerPlay = false;
	gameScreen.style.display = "block";		
	resetAll();
}

compPlay.onclick = function() {
	mainScreen.style.display = "none";	
	computerPlay = true;
	gameScreen.style.display = "block";		
	resetAll();
}

for (var i = 0; i < backButton.length; i++) {
	backButton[i].onclick = function() {
	resetAll();
	mainScreen.style.display = "block";	
	gameScreen.style.display = "none";		
	gameOver.style.display = "none";

	}	
};


playAgain.onclick = function() {
	resetAll();
	gameOver.style.display = "none";
	
}
reset.onclick = resetAll;
	
window.onload = init;