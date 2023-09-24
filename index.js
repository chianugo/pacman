canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// let boundarySize = 40;

class Boundary {
  static width = 40;
  static height = 40;
  constructor({ position }) {
    this.position = position;
    this.width = 40;
    this.height = 40;
  }

  draw() {
    ctx.fillStyle = "blue";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

class Pacman {
  constructor({ position, velocity }) {
    this.position = position;
    this.velocity = velocity;
    this.radius = 14;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = "yellow";
    ctx.fill();
    ctx.closePath();
  }

  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}

const pacman = new Pacman({
  position: {
    x: Boundary.width + Boundary.width / 2,
    y: Boundary.height + Boundary.height / 2,
  },
  velocity: { x: 0, y: 0 },
});

let lastDirection = "";

const keys = {
  up: {
    pressed: false,
  },
  left: {
    pressed: false,
  },
  down: {
    pressed: false,
  },
  right: {
    pressed: false,
  },
};

const map = [
  ["-", "-", "-", "-", "-", "-", "-"],
  ["-", " ", " ", " ", " ", " ", "-"],
  ["-", " ", "-", "-", "-", " ", "-"],
  ["-", " ", " ", " ", " ", " ", "-"],
  ["-", "-", "-", "-", "-", "-", "-"],
];

const boundaries = [];

map.forEach((row, i) => {
  row.forEach((symbol, j) => {
    switch (symbol) {
      case "-":
        boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * j,
              y: Boundary.height * i,
            },
          })
        );
        break;
      case " ":
        break;
    }
  });
});

const animate = () => {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  boundaries.forEach((boundary) => boundary.draw());
  pacman.update();
  pacman.velocity.y = 0;
  pacman.velocity.x = 0;

  if (keys.up.pressed && lastDirection === "up") {
    pacman.velocity.y = -3;
  } else if (keys.left.pressed && lastDirection === "left") {
    pacman.velocity.x = -3;
  } else if (keys.down.pressed && lastDirection === "down") {
    pacman.velocity.y = 3;
  } else if (keys.right.pressed && lastDirection === "right") {
    pacman.velocity.x = 3;
  }
};

animate();

window.addEventListener("keydown", ({ key }) => {
  switch (key) {
    case "w":
    case "ArrowUp":
      keys.up.pressed = true;
      lastDirection = "up";
      break;
    case "a":
    case "ArrowLeft":
      keys.left.pressed = true;
      lastDirection = "left";
      break;
    case "s":
    case "ArrowDown":
      keys.down.pressed = true;
      lastDirection = "down";
      break;
    case "d":
    case "ArrowRight":
      keys.right.pressed = true;
      lastDirection = "right";
      break;
  }
});

window.addEventListener("keyup", ({ key }) => {
  switch (key) {
    case "w":
    case "ArrowUp":
      keys.up.pressed = false;
      break;
    case "a":
    case "ArrowLeft":
      keys.left.pressed = false;
      break;
    case "s":
    case "ArrowDown":
      keys.down.pressed = false;
      break;
    case "d":
    case "ArrowRight":
      keys.right.pressed = false;
      break;
  }
});
