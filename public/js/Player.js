class Player {
  constructor(maxSpeed, jumpStrength, floorY, animations) {
    this.floorY = floorY;
    this.x = -50;
    this.y = this.floorY;
    this.speed = 3;
    this.maxSpeed = maxSpeed;
    this.globalSpeed = 1;
    this.onGround = false;
    this.jumpStrength = jumpStrength;
    this.vy = 0;
    this.maxLandLag = 25;
    this.landLag = this.maxLandLag;

    this.animations = animations;
    this.animationCounter = 0;
    this.maxAnimationCounter = this.animations.length;
    this.score = 0;
  }
  setGlobalSpeed(speed) {
    this.globalSpeed = speed;
  }
  setX(x) {
    this.x = x;
  }
  addVelUp(vel) {
    this.vy = -vel;
  }
  addVelDown(vel) {
    this.vy += vel;
  }
  show() {
    let showX = this.x - this.animations[0].width / 4;
    if (this.x >= innerWidth / 10) {
      showX = innerWidth / 10 - this.animations[0].width / 4;
    }

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
        this.addVelUp(this.jumpStrength);
        this.score += this.speed * 20;
        this.landLag = 0;
      }
    }
  }

  decreaseSpeed() {
    this.speed--;
    if (this.speed < 0) {
      this.speed = 0;
    }
  }
  addSpeed() {
    this.speed++;
    if (this.speed > 10) {
      this.speed = 10;
    }
  }

  moveForward() {
    this.x += this.speed + this.globalSpeed;
    this.globalSpeed = this.x / 5000;
  }

  getScore() {
    return Math.floor(this.score);
  }
  getDistance() {
    return Math.floor(this.x);
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
      this.addVelDown(this.jumpStrength / 17);
    }
    if (this.landLag < this.maxLandLag) {
      this.landLag++;
    }
    this.score += this.speed;
  }
}
