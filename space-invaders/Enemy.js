class Enemy {
  constructor(x, size, color, speed, canvasHeight, canvasWidth) {
    this.x = x;
    this.y = 0;
    this.size = size;
    this.color = color;
    this.speed = speed;
    this.canvasHeight = canvasHeight;
    this.canvasWidth = canvasWidth;
  }

  draw() {
    fill(this.color);
    rect(this.x, this.y, this.size, this.size);
  }

  update() {
    // check if the enemy is at the bottom of the screen
    if (this.y >= this.canvasHeight) {
      // if so, then it's going to reset to
      //  the top of the screen with random x
      this.y = 0;
      this.x = floor(random() * (this.canvasWidth - this.size));
    }
    // move the enemy
    this.y += this.speed;
  }
}
