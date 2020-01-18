class Player {
  constructor(maxSpeed, jumpStrength, floorY) {
    this.floorY = floorY;
    this.x = 0;
    this.y = this.floorY;
    this.speed = 0;
    this.maxSpeed = maxSpeed;
    this.globalSpeed = 1;
    this.onGround = false;
    this.jumpStrength = jumpStrength;
    this.vy = 0;
    this.maxLandLag = 50;
    this.landLag = this.maxLandLag;
  }
  setGlobalSpeed(speed) {
    this.globalSpeed = speed;
  }
  setX(x) {
    this.x = x;
  }
  addVelUp(vel) {
    this.vy -= vel;
  }
  addVelDown(vel) {
    this.vy += vel;
  }
  show() {
    let showX = this.x;
    if (this.x >= innerWidth / 2) {
      showX = innerWidth / 2;
    }
    fill(255, 0, 0);
    rect(showX, this.y, 50, -50);
    this.run();
  }
  jump() {
    if (this.onGround) {
      if (this.landLag == this.maxLandLag) {
        this.addVelUp(30);
        this.landLag = 0;
      }
    }
  }

  moveForward() {
    this.x += this.speed + this.globalSpeed;
  }

  getScore() {
    return this.x;
  }

  run() {
    this.moveForward();
    if (this.y + this.vy >= this.floorY) {
      this.y = this.floorY;
      this.vy = 0;
      this.onGround = true;
    } else {
      this.y += this.vy;
      this.onGround = false;
      this.addVelDown(3);
    }
    if (this.landLag < this.maxLandLag) {
      this.landLag++;
    }
  }
}
