const canvas = document.getElementById('myCanvas');
const context = canvas.getContext('2d');

let x = canvas.width / 2;
let y = canvas.height - 30;

let dx = 2;
let dy = -2;
const ballRadius = 10;

const drawBall = () => {
  context.beginPath();
  context.arc(x, y, ballRadius, (Math.PI / 180) * 0, (Math.PI / 180) * 360);
  context.fillStyle = '#0095DD';
  context.fill();
  context.closePath();
};

const draw = () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();

  if (y + dy < 0) dy = -dy;
  if (y + dy > canvas.height) dy = -dy;
  if (x + dy < 0) dx = -dx;
  if (x + dx > canvas.width) dx = -dx;
  x += dx;
  y += dy;
};

setInterval(draw, 16);
