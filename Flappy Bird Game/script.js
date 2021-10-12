// 1. Instancia de fondo
let img = new Image();
img.src = "./images/bg.png";

// 2. Instancia de "Faby"
let flappyImg = new Image();
flappyImg.src = "./images/flappy.png";

// 3. Instncia de "Tubo Superior"
let wallTop = new Image();
wallTop.src = "./images/obstacle_top.png";

// 3. Instancia de "Tubo Inferior"
let wallBottom = new Image();
wallBottom.src = "./images/obstacle_bottom.png";

// 4. Creación de Canvas
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

// 5. Botón de iniciar juego
window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    updateCanvas()
  };
};

// 6. Fondo en movimiento (Como el de Mario que hicimos)
let backgroundImage = {
  img: img,
  x: 0,
  speed: -1,

  move: function() {
    this.x += this.speed;
    this.x %= canvas.width;
  },

  draw: function() {
    ctx.drawImage(this.img, this.x, 0);
    if (this.speed < 0) {
      ctx.drawImage(this.img, this.x + canvas.width, 0);
    } else {
      ctx.drawImage(this.img, this.x - this.img.width, 0);
    }
  }
};

// 7. Objeto del jugador
const player = {
  x: 15,
  y: canvas.height / 2,
  width: 50,
  height: 50,
  speedX: 5,
  speedY: 15,
  gravity: 3,
  gravitySpeed: 1,
  imgScale: 1.3,

  move: function(direction) {
    if (direction === "space") {
      this.y -= this.speedY;
    }
    this.x = Math.min(canvas.width - this.width, Math.max(0, this.x));
    this.y = Math.min(canvas.height - this.height, Math.max(0, this.y));
  },

  update: function() {
    this.y += this.gravity;
  },

  draw: function() {
    ctx.drawImage(flappyImg, this.x, this.y, 50 * this.imgScale, 50);
  },

  isColliding: function(wall) {
    return (
      this.x < wall.x + wall.w &&
      this.x + this.width > wall.x &&
      this.y < wall.y + wall.h &&
      this.height + this.y > wall.y
    );
  },

  isDead: function(walls) {
    return walls.some(this.isColliding.bind(this));
  }
};

// 8. Nuestra actualizacion de canvas.
const updateCanvas = () => {
  Object.keys(keysPressed).forEach(function(direction) {
    if (keysPressed[direction]) {
      player.move(direction);
    }
  });

  // Los obstáculos se mueven
  obstacles.move();
  player.update();
  backgroundImage.move();
  obstacles.clearWalls();
  backgroundImage.speed *= 1 + obstacles.wallCounter / 300000;
  obstacles.speed *= 1 + obstacles.wallCounter / 300000;

  if (player.isDead(obstacles.walls)) {
    alert("You've lost! Your score: " + obstacles.wallCounter);
    location.reload();
    obstacles.wallCounter = 0;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  backgroundImage.draw();
  player.draw();
  obstacles.draw();

  requestAnimationFrame(updateCanvas);
}

// 9. INPUT (Keyboard, Mouse)
let keysPressed = {
  space: false
};

let SPACE_KEY = 32;

document.onkeydown = function(event) {
  event.preventDefault();
  switch (event.keyCode) {
    case SPACE_KEY:
      keysPressed.space = true;
      break;
  }
};

document.onkeyup = function(event) {
  switch (event.keyCode) {
    case SPACE_KEY:
      keysPressed.space = false;
      break;
  }
};

// 10. Creación de obstáculos
let obstacles = {
  walls: [],
  width: 70,
  speed: 8,
  maxSpace: 450,
  minSpace: 175,
  wallCounter: 0,

  createWall: function() {
    let space = Math.random() * (this.maxSpace - this.minSpace) + this.minSpace;
    let posY = Math.random() * (canvas.height - space);
    this.wallCounter += 1;

    this.walls.push({
      image: wallTop,
      x: canvas.width,
      y: 0,
      w: this.width,
      h: posY
    });

    this.walls.push({
      image: wallBottom,
      x: canvas.width,
      y: posY + space,
      w: this.width,
      h: canvas.height - posY - space
    });
  },

  moveWall: function(wall) {
    wall.x = wall.x - this.speed;
  },

  move: function() {
    this.walls.forEach(this.moveWall.bind(this));
  },

  drawImage: function(wall) {
    ctx.drawImage(wall.image, wall.x, wall.y, wall.w, wall.h);
  },

  draw: function() {
    ctx.fillStyle = "green";
    this.walls.forEach(this.drawImage);
  },

  clearWalls: function() {
    for (let i = 0; i < this.walls.length; i++) {
      if (this.walls[i].x < 0) {
        this.walls.splice(this.walls.indexOf(this.walls[i]), 1);
        console.log("here");
      }
    }
  }
};

// 11. Aparición de pipas

setInterval(function() {
  obstacles.createWall();
}, 500);
