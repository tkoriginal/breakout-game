const canvas = document.getElementById('myCanvas');
const context = canvas.getContext('2d');

let x = canvas.width / 2;
let y = canvas.height - 30;

let dx = 2;
let dy = -2;
const ballRadius = 10;

const paddleHeight = 10;
const paddleWidth = 75;
const paddleX = (canvas.width - paddleWidth) / 2;

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
  if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) dy = -dy;
  if (x + dx > canvas.width - ballRadius || x + dy < ballRadius) dx = -dx;

  x += dx;
  y += dy;
};

setInterval(draw, 10);
