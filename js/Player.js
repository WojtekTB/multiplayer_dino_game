class Player {
  constructor(maxSpeed, jumpStrength, floorY, animations) {
    this.floorY = floorY;
    this.x = 0;
    this.y = this.floorY;
    this.speed = 1;
    this.maxSpeed = maxSpeed;
    this.globalSpeed = 1;
    this.onGround = false;
    this.jumpStrength = jumpStrength;
    this.vy = 0;
    this.maxLandLag = 50;
    this.landLag = this.maxLandLag;

    this.animations = animations;
    this.animationCounter = 0;
    this.maxAnimationCounter = this.animations.length;
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

    image(
      this.animations[Math.floor(this.animationCounter)],
      showX,
      this.y,
      50,
      -50
    );
    this.run();

    this.animationCounter += (this.speed + this.globalSpeed) * 0.08;
    if (this.animationCounter > this.maxAnimationCounter) {
      this.animationCounter = 0;
    }
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
      this.addVelDown(this.jumpStrength / 20);
    }
    if (this.landLag < this.maxLandLag) {
      this.landLag++;
    }
  }
}
