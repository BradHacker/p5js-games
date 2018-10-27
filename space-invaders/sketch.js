let player;
let enemy;

function setup() {
  createCanvas(300, 300);
  player = new Player(20, 5, color(66, 134, 244), width / 2);
  enemy = new Enemy(10, 5, height);
}

function draw() {
  background(0);
  updatePlayer();
  enemy.update();
  player.draw();
  enemy.draw();
}

/*
Left: -1
Right: 1
*/
function updatePlayer() {
  if (keyIsDown(LEFT_ARROW)) {
    player.move(-1, width);
  }
  if (keyIsDown(RIGHT_ARROW)) {
    player.move(1, width);
  }
}
