import TPiece from './TPiece';
let T_Piece = new TPiece();
T_Piece.build();
const canvas: HTMLCanvasElement = document.querySelector('#tetris');
const ctx = canvas!.getContext('2d');

ctx.scale(20, 20);

// const T_Piece = [[0, 0, 0], [1, 1, 1], [0, 1, 0]];

function draw() {
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  drawMatrix(T_Piece.matrix, player.pos);
}

function drawMatrix(matrix, offset): void {
  matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        ctx.fillStyle = 'red';
        ctx.fillRect(x + offset.x, y + offset.y, 1, 1);
      }
    });
  });
}

let dropCounter = 0;
let dropInterval = 1000;

let lastTime = 0;
function update(time = 0) {
  if (!isColliding('bottom')) {
    const deltaTime = time - lastTime;
    lastTime = time;

    dropCounter += deltaTime;

    if (dropCounter > dropInterval) {
      player.pos.y += 1;
      dropCounter = 0;
    }
  }

  draw();
  requestAnimationFrame(update);
}

const player = {
  pos: { x: 5, y: 18 },
  matrix: T_Piece.matrix,
};

document.addEventListener('keydown', function(event) {
  if (checkKey.Left(event.keyCode) && !isColliding('left')) {
    player.pos.x -= 1;
  } else if (checkKey.Right(event.keyCode) && !isColliding('right')) {
    player.pos.x += 1;
  } else if (checkKey.Up(event.keyCode)) {
    T_Piece.rotate();
  } else if (checkKey.Down(event.keyCode) && !isColliding('bottom')) {
    player.pos.y += 1;
    dropCounter = 0;
  }
});

function isColliding(edge: string): boolean {
  if (edge === 'bottom') {
    return player.pos.y >= 21;
  } else if (edge === 'left') {
    return player.pos.x <= 0;
  } else if (edge === 'right') {
    return player.pos.x >= 9;
  }

  return false;
}

const checkKey = {
  Left: keyCode => keyCode === 37,
  Right: keyCode => keyCode === 39,
  Up: keyCode => keyCode === 38,
  Down: keyCode => keyCode === 40,
};

update();
