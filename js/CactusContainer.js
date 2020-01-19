/**
 * Basic idea is to have it generate a long list of blocks withing every like 1000 meters
 * and then let you see what catuses are there from looking up your x as an id
 */

class CactusContainer {
  constructor() {
    //assume every array withoing the range array is 1000 meters worth
    this.rangeScale = 1000;
    this.range = [];
  }
  getCactuses(x) {
    let placeOnRange = Math.floor(x / this.rangeScale);
  }
}

class Cactus {
  static makeCactus(x, width, height) {
    return { x: x, width: width, height: height };
  }
}
