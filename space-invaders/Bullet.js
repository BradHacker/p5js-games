class Bullet {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  draw() {
    fill(60 / 360, 0.03, 0.96);
    rectMode(CENTER);
    rect(this.x, this.y, 5, 5);
  }

  update() {
    this.y -= 5;
  }
}
