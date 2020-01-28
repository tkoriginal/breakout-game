const canvas = document.getElementById('myCanvas');
const context = canvas.getContext('2d');

let x = canvas.width / 2;
let y = canvas.height - 30;

let dx = 5;
let dy = -5;
const ballRadius = 10;

const paddleHeight = 10;
const paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;
let rightPressed = false;
let leftPressed = false;
let brickRowCount = 3;
let brickColumnCount = 5;
let brickWidth = 75;
let brickHeight = 20;
let brickPadding = 10;
let brickOffsetTop = 30;
let brickOffsetLeft = 30;
let score = 0;
let lives = 3;
let level = 1;
let maxLevel = 5;

let bricks = [];
const initBricks = () => {
  for (column = 0; column < brickColumnCount; column++) {
    bricks[column] = [];
    for (row = 0; row < brickRowCount; row++) {
      bricks[column][row] = {
        x: 0,
        y: 0,
        status: 1,
      };
    }
  }
};

initBricks();

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

const mouseMoveHandler = event => {
  let relativeX = event.clientX - canvas.offsetLeft;
  if (
    relativeX > paddleWidth / 2 &&
    relativeX < canvas.width - paddleWidth / 2
  ) {
    paddleX = relativeX - paddleWidth / 2;
  }
};

document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);
document.addEventListener('mousemove', mouseMoveHandler);

const drawScore = () => {
  context.font = '16px sans-serif';
  context.fillStyle = '#0095DD';
  context.fillText(`Score: ${score}`, 8, 20);
};

const drawLives = () => {
  context.font = '16px sans-serif';
  context.fillStyle = '#0095DD';
  context.fillText(`Lives: ${lives}`, canvas.width - 65, 20);
};

const drawLevel = () => {
  context.font = '16px sans-serif';
  context.fillStyle = '#0095DD';
  context.fillText(`Level: ${level}`, canvas.width / 2 - 30, 20);
};

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

const collisionDetection = () => {
  for (column = 0; column < brickColumnCount; column++) {
    for (row = 0; row < brickRowCount; row++) {
      let brick = bricks[column][row];
      if (brick.status === 1) {
        if (
          x > brick.x &&
          x < brick.x + brickWidth + ballRadius &&
          y > brick.y &&
          y < brick.y + brickHeight + ballRadius
        ) {
          dy = -dy;
          brick.status = 0;
          score++;
          if (score === brickColumnCount * brickRowCount) {
            if (level === maxLevel) {
              alert('You Win!');
              window.location.reload();
            } else {
              level++;
              initBricks();
            }
          }
        }
      }
    }
  }
};

const drawBricks = () => {
  for (column = 0; column < brickColumnCount; column++) {
    for (row = 0; row < brickRowCount; row++) {
      if (bricks[column][row].status === 1) {
        let brickX = column * (brickWidth + brickPadding) + brickOffsetLeft;
        let brickY = row * (brickHeight + brickPadding) + brickOffsetTop;
        bricks[column][row].x = brickX;
        bricks[column][row].y = brickY;
        context.beginPath();
        context.rect(brickX, brickY, brickWidth, brickHeight);
        context.fillStyle = '#0095DD';
        context.fill();
        context.closePath();
      }
    }
  }
};
const draw = () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawPaddle();
  drawBricks();
  collisionDetection();
  drawScore();
  drawLives();
  drawLevel();
  // check to see if the ball is on the edge, then reverse directions
  if (y + dy < ballRadius) dy = -dy;
  if (y + dy > canvas.height - ballRadius) {
    if (x > paddleX && x < paddleX + paddleWidth) dy = -dy;
    else {
      lives--;
      if (!lives) {
        document.location.reload();
      }
      // alert('You Lose!');
      x = canvas.width / 2;
      y = canvas.height - 30;
    }
  }
  if (x + dx > canvas.width - ballRadius || x + dy < ballRadius) dx = -dx;
  if (rightPressed && paddleX < canvas.width - paddleWidth) paddleX += 7;
  if (leftPressed && paddleX > 0) paddleX -= 7;
  x += dx;
  y += dy;
  requestAnimationFrame(draw);
};

draw();
