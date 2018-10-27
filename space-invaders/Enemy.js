class Enemy {
  constructor(x, rowOffset, size, speed, canvasSize) {
    this.x = x;
    this.y = 0 - rowOffset;
    this.size = size;
    this.speed = speed;
    this.maxSpeed = 1;
    this.color = color(speed / this.maxSpeed - 0.1, 1, 1);
    this.canvasSize = canvasSize;
  }

  draw() {
    fill(this.color);
    rectMode(CORNER);
    rect(this.x, this.y, this.size, this.size);
  }

  update() {
    // check if the enemy is at the bottom of the screen
    if (this.y >= this.canvasSize) {
      // if so, then it's going to reset to
      //  the top of the screen with random x
      this.y = 0;
      //this.x = floor(random() * (this.canvasSize - this.size));
    }
    // move the enemy
    this.y += this.speed;
  }
}
