let player;
let enemies = [];
let enemyCount = 5;
let enemySize = 15;
let idealMarginSize = 5;
let gameOver = false;
let score = 0;
let level = 1;
let highscores = [];
let highscoreDisp;
let highscoreDiv, highscoreLabel, highscoreInput, highscoreSubmit;

let totalEnemiesAcross, trueMarginSize;

function setup() {
  createCanvas(300, 300);
  console.log(height);
  console.log(width);
  colorMode(HSB, 1);
  player = new Player(20, 5, color(39 / 360, 0.74, 1), width / 2);
  totalEnemiesAcross = floor(
    (width - idealMarginSize) / (idealMarginSize + enemySize)
  );
  console.log(`Total Enemies Across: ${totalEnemiesAcross}`);
  trueMarginSize =
    (width - enemySize * totalEnemiesAcross) / (totalEnemiesAcross + 1);
  console.log(`True Margin Size: ${trueMarginSize}`);
  spawnEnemies();
  highscoreDisp = createP("Top 5 -\n");
  highscoreDiv = createDiv();
  highscoreLabel = createP("Enter Your Name, Submit Your Score!");
  highscoreInput = createInput();
  highscoreSubmit = createButton("Submit");
  highscoreSubmit.mousePressed(submitScore);
  highscoreLabel.hide();
  highscoreInput.hide();
  highscoreSubmit.hide();
}

function draw() {
  background(0);
  if (!gameOver) updateSprites();
  drawSprites();
  if (gameOver) {
    textSize(20);
    textAlign(CENTER, CENTER);
    fill(255);
    text("Game Over!", 0, 0, width, height);
  }
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

function updateSprites() {
  updatePlayer();
  player.updateBullets();
  for (let enemy of enemies) {
    enemy.update();
  }
  checkCollisions();
}

function drawSprites() {
  player.draw();
  fill(206 / 360, 0.84, 0.95);
  text(`Lives: ${player.lives}`, 0, height - 12);
  text(`Score: ${score}`, 0, 12);
  for (let enemy of enemies) {
    enemy.draw();
  }
}

function keyPressed() {
  if (keyCode == 32) {
    player.shoot();
  }
}

function checkCollisions() {
  for (let e = 0; e < enemies.length; e++) {
    let enemy = enemies[e];
    for (let b = 0; b < player.bullets.length; b++) {
      let bullet = player.bullets[b];
      if (
        bullet.x > enemy.x &&
        bullet.x < enemy.x + enemy.size &&
        bullet.y > enemy.y &&
        bullet.y < enemy.y + enemy.size
      ) {
        enemies.splice(e, 1);
        player.bullets.splice(b, 1);
        score += 10;
        if (enemies.length == 0) {
          level += 1;
          enemyCount = level * 5;
          player.bullets = [];
          spawnEnemies();
        }
      }
    }
    if (
      player.location > enemy.x - enemy.size &&
      player.location < enemy.x + enemy.size &&
      player.y > enemy.y - enemy.size &&
      player.y < enemy.y + enemy.size
    ) {
      enemies.splice(e, 1);
      player.lives -= 1;
      if (player.lives <= 0) {
        gameOver = true;
        highscoreLabel.show();
        highscoreInput.show();
        highscoreSubmit.show();
      }
    }
    if (enemy.y + enemy.size > height) {
      gameOver = true;
      highscoreLabel.show();
      highscoreInput.show();
      highscoreSubmit.show();
    }
  }
}

function spawnEnemies() {
  for (let i = 0; i < enemyCount; i++) {
    let row = floor(i / totalEnemiesAcross);
    let x =
      trueMarginSize +
      (trueMarginSize + enemySize) * i -
      row * (width - trueMarginSize);
    let yOffset = row * (enemySize + trueMarginSize);
    enemies[i] = new Enemy(x, yOffset, enemySize, 0.1 + 0.01 * level, height);
  }
}

function gotHighscores(data) {
  console.log(data);
  highscores = data.filter(score => score.gameId == 1);
  highscoreDisp.html(
    `Top 5 - \n ${highscores
      .slice(0, 4)
      .map(score => `\n${score.name} - ${score.score}`)}`
  );
}
