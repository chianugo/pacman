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
const map = [
  ["-", "-", "-", "-", "-", "-", "-"],
  ["-", " ", " ", " ", " ", " ", "-"],
  ["-", " ", "-", "-", "-", " ", "-"],
  ["-", " ", " ", " ", " ", " ", "-"],
  ["-", "-", "-", "-", "-", "-", "-"],
];

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

const boundaries = [];
const pacman = new Pacman({
  position: {
    x: Boundary.width + Boundary.width / 2,
    y: Boundary.height + Boundary.height / 2,
  },
  velocity: { x: 0, y: 0 },
});

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
};

animate();

window.addEventListener("keydown", ({ key }) => {
  switch (key) {
    case "w":
    case "ArrowUp":
      pacman.velocity.y = -5;
      break;
    case "a":
    case "ArrowLeft":
      pacman.velocity.x = -5;
      break;
    case "s":
    case "ArrowDown":
      pacman.velocity.y = 5;
      break;
    case "d":
    case "ArrowRight":
      pacman.velocity.x = 5;
      break;
  }
  console.log(pacman.velocity);
});

window.addEventListener("keyup", ({ key }) => {
  switch (key) {
    case "w":
    case "ArrowUp":
      pacman.velocity.y = 0;
      break;
    case "a":
    case "ArrowLeft":
      pacman.velocity.x = 0;
      break;
    case "s":
    case "ArrowDown":
      pacman.velocity.y = 0;
      break;
    case "d":
    case "ArrowRight":
      pacman.velocity.x = 0;
      break;
  }
  console.log(pacman.velocity);
});
