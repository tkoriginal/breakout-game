const canvas = document.getElementById('myCanvas');
const context = canvas.getContext('2d');

let x = canvas.width / 2;
let y = canvas.height - 30;

let dx = 2;
let dy = -2;
const ballRadius = 10;

const paddleHeight = 10;
const paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;
let rightPressed = false;
let leftPressed = false;

const keyDownHandler = event => {
  if (event.keyCode === 39) {
    rightPressed = true;
  } else if (event.keyCode === 37) {
    leftPressed = true;
  }
};

const keyUpHandler = event => {
  if (event.keyCode === 39) {
    rightPressed = false;
  } else if (event.keyCode === 37) {
    leftPressed = false;
  }
};

document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

const drawBall = () => {
  context.beginPath();
  context.arc(x, y, ballRadius, (Math.PI / 180) * 0, (Math.PI / 180) * 360);
  context.fillStyle = '#0095DD';
  context.fill();
  context.closePath();
};

const drawPaddle = () => {
  context.beginPath();
  context.rect(
    paddleX,
    canvas.height - paddleHeight,
    paddleWidth,
    paddleHeight,
  );
  context.fillStyle = '#0095DD';
  context.fill();
  context.closePath();
};

const draw = () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawPaddle();

  // check to see if the ball is on the edge, then reverse directions
  if (y + dy < ballRadius) dy = -dy;
  if (y + dy > canvas.height - ballRadius) {
    if (x > paddleX && x < paddleX + paddleWidth) dy = -dy;
    else {
      alert('GAME OVER');
      document.location.reload();
    }
  }
  if (x + dx > canvas.width - ballRadius || x + dy < ballRadius) dx = -dx;
  if (rightPressed && paddleX < canvas.width - paddleWidth) paddleX += 7;
  if (leftPressed && paddleX > 0) paddleX -= 7;
  x += dx;
  y += dy;
};

setInterval(draw, 10);
