(function(){
	var green = document.querySelector(".laranjo-snake");
	var greenSnake = green.getContext("2d");

	var arrowLeft = document.querySelector("#arrow-left");
    var arrowUp = document.querySelector("#arrow-up");
    var arrowRight = document.querySelector("#arrow-right");
    var arrowDown = document.querySelector("#arrow-down");

    var tileSize = 10;
	var WIDTH = green.width;
    var HEIGHT = green.height;

    var quantidadeMaca = 6;
    var maçasComidas = 0;
	var initialSnakeLength = 1;

    var walls = [];
	var snake = [];

	var snakeLeft = false;
	var snakeUp = false;
	var snakeRight = false;
	var snakeDown = false;

	var countdown = 600;
	var countdownInterval;

	var apple = { 
        x: 50, 
        y: 100,
        width: 10, 
        height: 10 
    }

	var player = {
		x: tileSize + 0,
		y: tileSize + 0,
		width: 10,
		height: 10,
		speed: 1,
	}
	
	var maze = [
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,1],
        [1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,1],
        [1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1],
		[1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    ];
	
	for(var row in maze){
		for(var column in maze[row]){
			var tile = maze[row][column];
			if(tile === 1){
				var wall = {
					x: tileSize * column,
					y: tileSize * row,
					width: tileSize,
					height: tileSize
				}
				walls.push(wall);
			}
		}
	}

	for (var i = 0; i < initialSnakeLength; i++) {
		snake.push({
			x: player.x,
			y: player.y,
			width: tileSize,
			height: tileSize
		});
	}

	countdownInterval = setInterval(updateCountdown, 1000);
	function updateCountdown() {
		countdown--;
		document.getElementById("countdown-display").textContent = countdown;
		if (countdown <= 0) {
			clearInterval(countdownInterval);
			gameOverModal();
		}
	}
	
	function gameOverModal() {
		const over = document.getElementById('over-snake');
		over.classList.add('game-snake');
	
		over.addEventListener('click', (e) => {
			if(e.target.id == 'over-snake') {
				over.classList.remove('game-snake');
				resetGame();
				countdown = 600;
				countdownInterval = setInterval(updateCountdown, 1000);
			}
		})
	}
    
	function renderSnake() {
        greenSnake.fillStyle = '#05C10D';
		for (var i = 0; i < snake.length; i++) {
            greenSnake.fillRect(snake[i].x, snake[i].y, snake[i].width, snake[i].height);
		}
	}

	function renderApple() {
		greenSnake.fillStyle = '#FF0000';
		greenSnake.fillRect(apple.x, apple.y, apple.width, apple.height);
	}

	function checkCollisionWithApple() {
		if (player.x < apple.x + apple.width &&
			player.x + player.width > apple.x &&
			player.y < apple.y + apple.height &&
			player.y + player.height > apple.y) {
			
			generateRandomApplePosition();
			maçasComidas++;

			var lastSnakePart = snake[snake.length - 1];
			snake.push({
				x: lastSnakePart.x,
				y: lastSnakePart.y,
				width: tileSize,
				height: tileSize
			});
			
            if (maçasComidas === quantidadeMaca) {
				greenModal();
                resetGame();
            }
		}
	}

	function greenModal() {
		const modal = document.getElementById('janela-snake');
		modal.classList.add('abrir-snake');
	
		modal.addEventListener('click', (e) => {
			if(e.target.id == 'fechar-snake' || e.target.id == 'janela-snake') {
				modal.classList.remove('abrir-snake');
			}
		})
	}
	
    function resetGame() {
        maçasComidas = 0;
        player.x = tileSize + 1;
        player.y = tileSize + 10;
        snake.length = initialSnakeLength;

		snake.splice(2, 2, {
			x: player.x + tileSize,
			y: player.y,
			width: tileSize,
			height: tileSize
		});

        generateRandomApplePosition();

		clearInterval(countdownInterval);
    }

	function updateSnake() {
		for (var i = snake.length - 1; i > 0; i--) {
			snake[i].x = snake[i - 1].x;
			snake[i].y = snake[i - 1].y;
		}

		snake[0].x = player.x;
		snake[0].y = player.y;

		if (maze[Math.floor(player.y / tileSize)][Math.floor(player.x / tileSize)] === 2) {
			player.x += tileSize;
		}
	}

	function isAppleOnWall() {
		for (var i in walls) {
			var wall = walls[i];
			if (apple.x < wall.x + wall.width &&
				apple.x + apple.width > wall.x &&
				apple.y < wall.y + wall.height &&
				apple.y + apple.height > wall.y) {
				return true;
			}
		}
		return false;
	}
	
	function generateRandomApplePosition() {
		var randomX = Math.floor(Math.random() * (WIDTH - tileSize));
		var randomY = Math.floor(Math.random() * (HEIGHT - tileSize));
		apple.x = randomX;
		apple.y = randomY;
	}
	
	function blockRectangle(a, b){
		var distX = (a.x + a.width/2) - (b.x + b.width/2);
		var distY = (a.y + a.height/2) - (b.y + b.height/2);
		
		var sumWidth = (a.width + b.width)/2;
		var sumHeight = (a.height + b.height)/2;
		
		if(Math.abs(distX) < sumWidth && Math.abs(distY) < sumHeight){
			var overlapX = sumWidth - Math.abs(distX);
			var overlapY = sumHeight - Math.abs(distY);
			
			if(overlapX > overlapY){
				a.y = distY > 0 ? a.y + overlapY : a.y - overlapY;
			} else {
				a.x = distX > 0 ? a.x + overlapX : a.x - overlapX;
			}
		}
	}

    arrowLeft.addEventListener("dragstart", function (e) {
		e.dataTransfer.setData("text/plain", "arrowLeft");
	});
  
	arrowUp.addEventListener("dragstart", function (e) {
		e.dataTransfer.setData("text/plain", "arrowUp");
	});
  
	arrowRight.addEventListener("dragstart", function (e) {
		e.dataTransfer.setData("text/plain", "arrowRight");
	});
  
	arrowDown.addEventListener("dragstart", function (e) {
		e.dataTransfer.setData("text/plain", "arrowDown");
	});
  
	window.addEventListener("drop", function (e) {
		e.preventDefault();
  
		var direction = e.dataTransfer.getData("text/plain");
  
		switch (direction) {
		  case "arrowLeft":
			snakeLeft = true;
			snakeUp = false;
			snakeRight = false;
			snakeDown = false;
			break;
		  case "arrowUp":
			snakeLeft = false;
			snakeUp = true;
			snakeRight = false;
			snakeDown = false;
			break;
		  case "arrowRight":
			snakeLeft = false;
			snakeUp = false;
			snakeRight = true;
			snakeDown = false;
			break;
		  case "arrowDown":
			snakeLeft = false;
			snakeUp = false;
			snakeRight = false;
			snakeDown = true;
			break;
		}
	});

	function update() {
		while (isAppleOnWall()) {
			generateRandomApplePosition();
		}
	
		if (snakeLeft && !snakeRight) {
			player.x -= player.speed;
		} else if (snakeRight && !snakeLeft) {
			player.x += player.speed;
		} else if (snakeUp && !snakeDown) {
			player.y -= player.speed;
		} else if (snakeDown && !snakeUp) {
			player.y += player.speed;
		}
	
		for (var i in walls) {
			var wall = walls[i];
			blockRectangle(player, wall);
		}
	
		updateSnake();
		checkCollisionWithApple();
	
	}
	
	function render(){
		greenSnake.clearRect(0, 0, WIDTH, HEIGHT);
		greenSnake.save();
		for(var row in maze){
			for(var column in maze[row]){
				var tile = maze[row][column];
                if(tile == 1){
                    var x = column * tileSize;
                    var y = row * tileSize;
					greenSnake.fillStyle = '#000000'; 
                    greenSnake.fillRect(x, y, tileSize, tileSize);
                } else if (tile === 2) {
					var x = column * tileSize;
					var y = row * tileSize;
					greenSnake.fillStyle = '#0000FF';
					greenSnake.fillRect(x, y, tileSize, tileSize);
				}
			}
		}

		renderApple();
		renderSnake();
		greenSnake.restore();
	}
	
	function loop(){
		update();
		render();
		requestAnimationFrame(loop, green);
	}
    requestAnimationFrame(loop, green);

}())

let selectedDirection = null;

function drag(event) {
	selectedDirection = event.target.src;
	document.querySelector('.g-snake').classList.add('drap');
}
function drop(event) {
	var img = document.createElement('img');
	img.src = selectedDirection;
	document.querySelector('.g-snake').appendChild(img);

    document.querySelector('.g-snake').classList.remove('drap');
	event.preventDefault();
}
function allowDrop(event) {
	event.preventDefault();
}
