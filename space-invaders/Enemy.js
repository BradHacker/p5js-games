class Enemy {
  constructor(size, speed, canvasSize) {
    this.x = floor(random() * (canvasSize - size));
    this.y = 0;
    this.size = size;
    this.color = color(random(255), random(255), random(255));
    this.speed = speed;
    this.canvasSize = canvasSize;
  }

  draw() {
    fill(this.color);
    rect(this.x, this.y, this.size, this.size);
  }

  update() {
    // check if the enemy is at the bottom of the screen
    if (this.y >= this.canvasSize) {
      // if so, then it's going to reset to
      //  the top of the screen with random x
      this.y = 0;
      this.x = floor(random() * (this.canvasSize - this.size));
    }
    // move the enemy
    this.y += this.speed;
  }
}
