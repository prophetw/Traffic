class SpeedUpStrategy {}

class DriverStrategy {}

class ClassicDriverStrategy extends DriverStrategy {}

class SportsDriverStrategy extends DriverStrategy {}

class CCC {
  width: number;
  lenth: number;
  maxSpeed: number;
  constructor() {
    this.width = 2;
    this.lenth = 3;
    this.maxSpeed = 120;
  }
  switchLane() {}
  start() {}
  stop() {}
  speedUp() {}
  slowDown() {}
}

class Lane {
  lenth: number;
  constructor() {
    this.lenth = 10;
  }
}

class Road {
  lanes?: Lane[];
  constructor() {}
}
