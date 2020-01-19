/**
 * Basic idea is to have it generate a long list of blocks withing every like 1000 meters
 * and then let you see what catuses are there from looking up your x as an id
 */

class CactusContainer {
  constructor() {
    //assume every array withoing the range array is rangeScale meters worth
    this.rangeScale = 1000;
    this.range = [];
    this.length = 10000; //how long the range will work
    for (let i = 0; i < this.length; i++) {
      this.generateCactusSet();
    }
  }
  getCactuses(x) {
    let placeOnRange = Math.floor(x / this.rangeScale);
    try {
      return this.range[placeOnRange];
    } catch (e) {
      console.log(e + " so I am adding more cactuses");
    }
  }
  generateCactusSet() {
    let numberOfCactuses = Math.floor(this.rangeScale * 0.003);
    let cactuses = [];
    for (let i = 0; i < numberOfCactuses; i++) {
      cactuses.push(
        Cactus.makeCactus(random(200, this.rangeScale + 200), 25, 50)
      );
    }
    this.range.push(cactuses);
  }
}

class Cactus {
  static makeCactus(x, width, height) {
    return { x: x, width: width, height: height };
  }
}
