/*********************
* Alan Wright
* Last Updated: 10/20/2012
* alanwright47@gmail.com
* www.alan-wright.com
*********************/

//Variables 
var context;
var ball;
var computer;
var human;
var up = false;
var down = false;
var space = false;
var score1 =0;
var score2 =0;
var count = 0;
var won = false;

//On the key down event, check for up and down keys. Set booleans accordingly
document.onkeydown = function(event) {
	event = event || window.event;
	
	var e = event.keyCode;

	 if (e==38){ //up
		up = true;
	 }

	 if (e==40){ //down
		down = true;
	 }
	 
	 if (e == 32) { //space
		space = true;
	}
}

//On keyup event, check for up and down keys. Set booleans accordingly
document.onkeyup = function(event) {
	event = event || window.event;
	
	var e = event.keyCode;

	 if (e==38 ){ //up
		up = false;
	 }

	 if (e==40 ){ //up
		down = false;
	 }
	 
}

function init(){
	context = myCanvas.getContext('2d');
	ball = new ball(myCanvas.width/2, myCanvas.height/2, 15, 3, 3);
	computer = new paddle(40, myCanvas.height/2 - 75/2, 7, 75, 5);
	human = new paddle(myCanvas.width-40, myCanvas.height/2 - 75/2, 7, 75, 5);
	
	gameScreen();
	
	//Set an interval for the canvas to be refreshed.
	// Basically call the draw function every 10 ms
	setInterval(draw, 10);
}

function gameScreen(){

	//Create the initial game screen
	context.fillStyle = "#000000";
	context.fillRect(0,0, myCanvas.width, myCanvas.height);
	context.font = "bold 40px helvetica";
	var measure = context.measureText("Pong!");  
	context.fillStyle = "#FFFFFF";
	context.fillText("Pong!", myCanvas.width/2 - measure.width/2, myCanvas.height/2);
	context.font = "bold 20px helvetica";
	var measure2 = context.measureText("Coded by: Alan Wright");
	context.fillText("Coded by: Alan Wright", myCanvas.width/2 - measure2.width/2, myCanvas.height/2 + 40);
	var measure3 = context.measureText("Press the space bar to continue...");
	context.fillText("Press the space bar to continue...", myCanvas.width/2 - measure3.width/2, myCanvas.height/2 + 80);
}

//Ball object
function ball(x,y, width,dx,dy){
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = width;
	this.color = "#FFFFFF";
	this.dx = dx;
	this.dy = dy;
}

//Paddle object
function paddle(x, y, width, height, dy){
	this.x = x;
	this.y = y;
	this. width = width;
	this.height = height;
	this.dy = dy;
	this.color = "#FFFFFF";
}

function draw(){
	
	//If the initial space button has been pressed
	if(space && !won){
		//Clear the old circle before we draw the new one
		context.fillStyle = "#000000";
		context.fillRect(0,0, myCanvas.width, myCanvas.height); //This erases the entire canvas
		
		//Print the lines
		context.beginPath();
		context.moveTo(0, 50);
		context.lineTo(myCanvas.width, 50);
		context.strokeStyle = "#FFFFFF";
		context.stroke();
		context.moveTo(myCanvas.width/2, 50);
		context.lineTo(myCanvas.width/2, myCanvas.height);
		context.stroke();
		
		//Print title and score
		context.font = "bold 25pt Courier";
		context.fillStyle = "#FFFFFF";
		context.fillText("Pong", myCanvas.width/2-40, 40);
		context.fillText(score1, 5, 40);
		if (score2 <100)
			context.fillText(score2, myCanvas.width-40, 40);
		else
			context.fillText(score2, myCanvas.width -60,40);
		
		//Draw ball
		context.beginPath();
		context.fillStyle = ball.color;
		context.fillRect(ball.x, ball.y, ball.width, ball.height); 
		context.closePath();
		context.fill();
		
		//Draw computer paddle
		context.beginPath();
		context.fillStyle = computer.color;
		context.fillRect(computer.x, computer.y, computer.width, computer.height);
		context.closePath();
		context.fill();
		
		//Draw human paddle
		context.beginPath();
		context.fillStyle = human.color;
		context.fillRect(human.x, human.y, human.width, human.height);
		context.closePath();
		context.fill();
		
		//Check boundaries and negate if necessary
		//If the ball hits the left boundary, give a point to the right and vice versa
		if (ball.x <= 0){
			//ball.dx = -ball.dx;
			ball.x = myCanvas.width/2;
			ball.y = Math.max(Math.random()*myCanvas.height-20, 60);
			ball.dx = 3;
			ball.dy = 3;
			score2++;
			if(score2 ==10)
				won = true;
			count = 0;
		}
		else if(ball.x +ball.width>= myCanvas.width){
			ball.dx =-ball.dx;
			ball.x = myCanvas.width/2;
			ball.y = Math.max(Math.random()*myCanvas.height-20, 60);
			ball.dx = -3;
			ball.dy = -3;
			score1++;
			if(score1 == 
			10)
				won = true;
			count = 0;
		}
		
		//If the ball hits the computer paddle
		if( ball.x >= computer.x && ball.x <= computer.x + computer.width && ball.y >= computer.y && ball.y <= computer.y+computer.height)
			ball.dx = -ball.dx;
		//If the ball hits the human paddle.
		if( ball.x + ball.width >= human.x && ball.x + ball.width <= human.x + human.width && ball.y >= human.y && ball.y <= human.y+ human.height)
			ball.dx = -ball.dx;
		
		//If the ball hits the top boundary
		if (ball.y <= 55 || ball.y + ball.width >= myCanvas.height)
			ball.dy = -ball.dy;
			
			
		//Increment dx,dy
		ball.x+=ball.dx;
		ball.y+=ball.dy;
		
		//Move computer up and down randomly
		/*if(computer.y >  55 && computer.dy < 0)
			computer.y += computer.dy;
		else if (computer.y <= computer.dy && computer.dy < 0)
			computer.dy = -computer.dy;
		else if(computer.y + computer.height < myCanvas.height - computer.dy && computer.dy > 0)
			computer.y += computer.dy;
		else
			computer.dy= -computer.dy;
		*/
		
		if(ball.x < myCanvas.width/2 && count%2==0){
			if(ball.y < computer.y && computer.y >  55)
				computer.y -= computer.dy;
			else if(ball.y > computer.y + computer.height && computer.y + computer.height < myCanvas.height - computer.dy)
				computer.y += computer.dy;
		}
			
		//If the up or down key is pressed, move the human
		if(up  && human.y >= 55)
			human.y -= human.dy;
		else if(down && human.y +human.height <=myCanvas.height - human.dy)
			human.y += human.dy;
			
		count++;
	}
	//If someone won
	else if(won){
	
		//If it was player 1, print the win screen
		if(score1==10){
			context.fillStyle = "#000000";
			context.fillRect(0,0, myCanvas.width, myCanvas.height);
			context.font = "bold 40px helvetica";
			var measure = context.measureText("The Computer Won! :'(");  
			context.fillStyle = "#FFFFFF";
			context.fillText("The Computer Won! :'(", myCanvas.width/2 - measure.width/2, myCanvas.height/2);
			context.font = "bold 20px helvetica";
			var measure2 = context.measureText("Better luck next time!");
			context.fillText("Better luck next time!", myCanvas.width/2 - measure2.width/2, myCanvas.height/2 + 40);
			var measure3 = context.measureText("Press the space bar to restart...");
			context.fillText("Press the space bar to restart...", myCanvas.width/2 - measure3.width/2, myCanvas.height/2 + 80);
			
			//Reset variables
			space = false;
			won = false;
			score1 = 0;
			score2 = 0;
		}
		//Otherwise player 2 won
		else{
			context.fillStyle = "#000000";
			context.fillRect(0,0, myCanvas.width, myCanvas.height);
			context.font = "bold 40px helvetica";
			var measure = context.measureText("You Won!");  
			context.fillStyle = "#FFFFFF";
			context.fillText("You Won!", myCanvas.width/2 - measure.width/2, myCanvas.height/2);
			context.font = "bold 20px helvetica";
			var measure2 = context.measureText("You are a pong master!");
			context.fillText("You are a Pong master!", myCanvas.width/2 - measure2.width/2, myCanvas.height/2 + 40);
			var measure3 = context.measureText("Press the space bar to restart...");
			context.fillText("Press the space bar to restart...", myCanvas.width/2 - measure3.width/2, myCanvas.height/2 + 80);
			
			//Reset variables
			space = false;
			won = false;
			score1 = 0;
			score2 = 0;
		}
		
	}
}