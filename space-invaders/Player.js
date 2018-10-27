class Player {
  constructor(size, speed, color, location) {
    this.size = size;
    this.speed = speed;
    this.color = color;
    this.location = location;
    this.y = height - (this.size + 10);
    this.bullets = [];
    this.lives = 3;
  }

  draw() {
    for (let bullet of this.bullets) {
      bullet.draw();
    }
    fill(this.color);
    rectMode(CORNER);
    rect(this.location, this.y, this.size, this.size);
  }

  move(direction, maxWidth) {
    //console.log(direction);
    if (direction > 0 && this.location + this.size <= maxWidth) {
      this.location += this.speed;
    } else if (direction < 0 && this.location >= 0) {
      this.location -= this.speed;
    }
  }

  shoot() {
    this.bullets.push(
      new Bullet(this.location + this.size / 2, this.y + this.size / 2)
    );
    console.log(this.bullets);
  }

  updateBullets() {
    for (let i = 0; i < this.bullets.length; i++) {
      let bullet = this.bullets[i];
      if (bullet.y < 0) {
        this.bullets.splice(i, 1);
      } else {
        bullet.update();
      }
    }
  }
}
