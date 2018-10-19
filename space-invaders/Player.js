class Player {
  constructor(size, speed, color, location) {
    this.size = size;
    this.speed = speed;
    this.color = color;
    this.location = location;
  }

  draw() {
    fill(this.color);
    rect(this.location, height - (this.size + 10), this.size, this.size);
  }

  move(direction, maxWidth) {
    //console.log(direction);
    if (direction > 0 && this.location + this.size <= maxWidth) {
      this.location += this.speed;
    } else if (direction < 0 && this.location >= 0) {
      this.location -= this.speed;
    }
  }
}
